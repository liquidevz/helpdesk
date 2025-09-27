<?php namespace App\Mail;

use App\Models\Reply;
use App\Models\Ticket;
use App\Services\Files\EmailStore;
use App\Services\Mail\TicketReferenceHash;
use Common\Files\FileEntry;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Queue\SerializesModels;

class TicketReply extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public string $reference;
    private string|null $previousEmailMessageId = null;
    public bool $simplifiedThreading = false;

    public function __construct(public Ticket $ticket, public Reply $reply)
    {
        $this->reference = (new TicketReferenceHash())->makeEmbedForEmail(
            $reply,
        );
    }

    public function build(): static
    {
        $this->ticket->load('user', 'latest_replies.user');
        $isFirstAgentReply =
            $this->ticket->latest_replies
                ->where('user_id', '!=', $this->ticket->user_id)
                ->count() === 1;
        $this->simplifiedThreading =
            settings('mail.simplified_threading') && !$isFirstAgentReply;

        $this->setMessageIdForPreviousEmail();

        $this->to($this->ticket->user->email)
            ->subject("RE: {$this->ticket->subject}")
            ->view('tickets.ticket-reply.ticket-reply')
            ->text('tickets.ticket-reply.ticket-reply-plain');

        //$this->addAttachments();

        return $this;
    }

    public function attachments(): array
    {
        return $this->reply->attachments
            ->map(function (FileEntry $entry) {
                return Attachment::fromStorageDisk(
                    'uploads',
                    $entry->getStoragePath(),
                )
                    ->as($entry->name)
                    ->withMime($entry->mime);
            })
            ->toArray();
    }

    public function headers(): Headers
    {
        // Add ticket reference hash as in Message-ID header
        $messageId = (new TicketReferenceHash())->makeMessageIdForEmail(
            $this->reply,
        );

        $textHeaders = [
            'X-Ticket-Reference' => $this->reply->uuid,
        ];
        if ($this->previousEmailMessageId) {
            $textHeaders['In-Reply-To'] = $this->previousEmailMessageId;
        }

        // set in reply to and references headers so email client can thread properly
        return new Headers(
            messageId: $messageId,
            references: $this->previousEmailMessageId
                ? [$this->previousEmailMessageId]
                : [],
            text: $textHeaders,
        );
    }

    /**
     * Add attachments from latest ticket reply to email.
     */
    protected function addAttachments(): void
    {
        if ($this->reply->attachments->isEmpty()) {
            return;
        }

        $basePath = rtrim(
            $this->reply->attachments
                ->first()
                ->getDisk()
                ->path(''),
            '/',
        );

        $this->reply->attachments->each(function (FileEntry $attachment) use (
            $basePath,
        ) {
            $this->attachFromStorage(
                $attachment->getStoragePath(),
                $attachment->name,
                [
                    'mime' => $attachment->mime,
                ],
            );
            //            $this->attach($basePath . '/' . $attachment->getStoragePath(), [
            //                'as' => $attachment->name,
            //                'mime' => $attachment->mime,
            //            ]);
        });
    }

    protected function setMessageIdForPreviousEmail(): void
    {
        $previousReply = $this->ticket->latest_replies
            ->where('user_id', '!=', $this->reply->user_id)
            ->where('id', '<', $this->reply->id)
            ->first();

        if ($previousReply) {
            $this->previousEmailMessageId = $previousReply->email_id;

            if (!$this->previousEmailMessageId) {
                $email = (new EmailStore())->getEmailForReply($previousReply);
                $this->previousEmailMessageId =
                    $email['headers']['Message-ID'] ??
                    ($email['headers']['Message-Id'] ?? null);
            }
        }
    }
}
