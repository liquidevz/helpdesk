<?php namespace App\Services\Mail;

use App\Models\Ticket;
use App\Models\User;
use App\Services\Ticketing\CreateTicket;
use Illuminate\Support\Arr;

class CreateTicketForFailedOutgoingEmail
{
    public function execute(array $data): Ticket
    {
        $host = parse_url(config('app.url'))['host'];
        $user = User::firstOrCreate([
            'email' => "postmaster@$host",
        ]);

        $data = Arr::only($data, [
            'recipient',
            'reason',
            'description',
            'headers',
        ]);

        if (isset($data['headers'])) {
            $data['headers'] = collect($data['headers'])
                ->map(function ($value, $key) {
                    return "{$key}: {$value}";
                })
                ->implode(PHP_EOL);
        }

        return (new CreateTicket())->execute([
            'body' => view('tickets.failed-email-ticket-body')
                ->with($data)
                ->render(),
            'subject' => 'Failed Email Delivery Report',
            'user_id' => $user->id,
        ]);
    }
}
