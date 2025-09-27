<?php namespace App\Services\Mail;

use App\Events\TicketCreated;
use App\Models\Reply;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\TicketIsLocked;
use App\Notifications\TicketRejected;
use App\Services\Files\EmailStore;
use App\Services\Mail\Parsing\ParsedEmail;
use App\Services\Ticketing\CreateTicket;
use App\Services\Ticketing\SubmitTicketReply;
use Common\Auth\Actions\CreateUser;
use Common\Files\Actions\CreateFileEntry;
use Common\Files\Actions\StoreFile;
use Common\Files\FileEntry;
use Common\Files\FileEntryPayload;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class TransformEmailIntoTicketOrReply
{
    public function __construct(protected ParsedEmail $parsedEmail)
    {
    }

    public function execute(array $options = []): void
    {
        $createNewTickets =
            $options['createNewTickets'] ??
            settings('tickets.create_from_emails');
        $createReplies =
            $options['createReplies'] ?? settings('replies.create_from_emails');
        $ticket = $this->getTicketEmailIsInReplyTo();

        // prevent replies from the same email from being created
        $emailId = $this->parsedEmail->getMessageId();
        if ($emailId && Reply::where('email_id', $emailId)->exists()) {
            return;
        }

        if ($ticket?->status === 'locked') {
            Notification::route(
                'mail',
                $this->parsedEmail->getSenderEmail(),
            )->notify(new TicketIsLocked($ticket));
            return;
        }

        //create new ticket from email
        if (!$ticket && $createNewTickets) {
            $newTicket = $this->createTicketFromEmail();
            $reply = $newTicket->replies->first();
        }

        //create reply for existing ticket from email
        if ($ticket && $createReplies) {
            $reply = $this->createReplyFromEmail($ticket);
        }

        if (!$ticket && !$createNewTickets) {
            $this->maybeSendTicketRejectedNotification();
        }

        $this->storeOriginalEmail($reply ?? null);
    }

    private function getTicketEmailIsInReplyTo(): ?Ticket
    {
        $reply = null;
        $referenceHash = new TicketReferenceHash();

        if ($this->parsedEmail->hasHeader('In-Reply-To')) {
            $inReplyToMessageId = $this->parsedEmail->getHeader('In-Reply-To');
            $uuid = $referenceHash->extractFromMessageId($inReplyToMessageId);
            // find reply either by email message ID or by BeDesk specific UUID for reply
            $reply = Reply::when(
                $uuid,
                fn($builder) => $builder->where('uuid', $uuid),
            )
                ->orWhere('email_id', $inReplyToMessageId)
                ->first();
        }

        if (!$reply && $this->parsedEmail->hasBody('plain')) {
            $uuid = $referenceHash->extractFromString(
                $this->parsedEmail->getBody('plain'),
            );
            if ($uuid) {
                $reply = Reply::where('uuid', $uuid)->first();
            }
        }

        if (!$reply && $this->parsedEmail->hasBody('html')) {
            $uuid = str_replace(
                '<wbr>',
                '',
                $referenceHash->extractFromString(
                    $this->parsedEmail->getBody('html'),
                ),
            );
            if ($uuid) {
                $reply = Reply::where('uuid', $uuid)->first();
            }
        }

        return $reply?->ticket;
    }

    private function createTicketFromEmail(): Ticket
    {
        $email = $this->parsedEmail->getSenderEmail();
        $user =
            User::where(['email' => $email])->first() ??
            (new CreateUser())->execute(['email' => $email]);

        $cidMap = $this->generateCidMap($user->id);

        $ticket = (new CreateTicket())->execute([
            'body' => $this->parsedEmail->getNormalizedBody($cidMap),
            'subject' => $this->parsedEmail->getSubject(),
            'user_id' => $user->id,
            'attachments' => $this->getEntryIdsFromAttachments($user->id),
            'email_id' => $this->parsedEmail->getMessageId(),
            'received_at_email' =>
                $this->parsedEmail->getHeader('Delivered-To') ??
                $this->parsedEmail->getHeader('To'),
        ]);

        event(new TicketCreated($ticket));

        return $ticket;
    }

    private function createReplyFromEmail(Ticket $ticket): Reply
    {
        $cidMap = $this->generateCidMap($ticket->user_id);

        return (new SubmitTicketReply())->execute(
            $ticket,
            [
                'body' => $this->parsedEmail->getNormalizedBody($cidMap),
                'user_id' => $ticket->user_id,
                'attachments' => $this->getEntryIdsFromAttachments(
                    $ticket->user_id,
                ),
                'email_id' => $this->parsedEmail->getMessageId(),
            ],
            Reply::REPLY_TYPE,
            Reply::SOURCE_EMAIL,
        );
    }

    /**
     * Store inline images and generate CID map for them.
     */
    private function generateCidMap(int $userId): array
    {
        $inlineAttachments = $this->parsedEmail->getAttachments('inline');

        return $inlineAttachments
            ->mapWithKeys(function ($attachment) use ($userId) {
                $fileEntry = $this->storeAttachment($attachment, [
                    'ownerId' => $userId,
                    'diskPrefix' => 'ticket_images',
                    'disk' => 'public',
                ]);
                return [$attachment['cid'] => url($fileEntry->url)];
            })
            ->toArray();
    }

    private function getEntryIdsFromAttachments(int $userId): array
    {
        $attachments = $this->parsedEmail->getAttachments('regular');

        $uploadIds = $attachments->map(function ($attachment) use ($userId) {
            $fileEntry = $this->storeAttachment($attachment, [
                'ownerId' => $userId,
            ]);
            return $fileEntry->id;
        });

        return $uploadIds->toArray();
    }

    protected function storeAttachment(
        array $attachment,
        array $additionalData,
    ): FileEntry {
        $data = [
            'clientName' => $attachment['original_name'],
            'clientMime' => $attachment['mime_type'],
            'clientExtension' => $attachment['extension'],
            'filename' => (string) Str::uuid(),
            'clientSize' => $attachment['size'],
        ];
        $data = array_merge($data, $additionalData);
        if (Arr::get($data, 'disk') === 'public') {
            $data[
                'filename'
            ] = "{$data['filename']}.{$data['clientExtension']}";
        }
        $payload = new FileEntryPayload($data);
        (new StoreFile())->execute($payload, [
            'contents' => $attachment['contents'],
        ]);
        return (new CreateFileEntry())->execute($payload);
    }

    private function storeOriginalEmail(Reply $reply = null): void
    {
        (new EmailStore())->storeEmail($this->parsedEmail, $reply);
    }

    /**
     * Send rejected notification to sender if
     * ticket creation via email channel is disabled.
     */
    private function maybeSendTicketRejectedNotification(): void
    {
        if (settings('tickets.send_ticket_rejected_notification')) {
            Notification::route(
                'mail',
                $this->parsedEmail->getSenderEmail(),
            )->notify(new TicketRejected());
        }
    }
}
