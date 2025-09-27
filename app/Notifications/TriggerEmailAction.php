<?php

namespace App\Notifications;

use App\Services\UrlGenerator;
use Common\Core\Prerender\Actions\ReplacePlaceholders;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TriggerEmailAction extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var string
     */
    public $message;

    /**
     * @param array $data
     */
    public function __construct(public $data)
    {
        $this->message = app(ReplacePlaceholders::class)->execute($data['message'], $data);
    }

    /**
     * @return array
     */
    public function via(mixed $notifiable)
    {
        return ['mail'];
    }

    /**
     * @return MailMessage
     */
    public function toMail(mixed $notifiable)
    {
        return (new MailMessage)
            ->subject($this->data['subject'])
            ->line($this->message)
            ->action(__('View Ticket'), app(UrlGenerator::class)->ticket($this->data['ticket']));
    }
}
