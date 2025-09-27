<?php

namespace App\Providers;

use App\Events\TicketCreated;
use App\Events\TicketReplyCreated;
use App\Events\TicketsAssigned;
use App\Listeners\AddPurchaseCodeToNewUser;
use App\Listeners\DeleteUserRelations;
use App\Listeners\SendReplyCreatedNotif;
use App\Listeners\SendTicketCreatedNotif;
use App\Listeners\SendTicketsAssignedNotif;
use App\Listeners\TicketEventSubscriber;
use Common\Auth\Events\SocialConnected;
use Common\Auth\Events\SocialLogin;
use Common\Auth\Events\UserCreated;
use Common\Auth\Events\UsersDeleted;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        TicketsAssigned::class => [SendTicketsAssignedNotif::class],
        TicketCreated::class => [SendTicketCreatedNotif::class],
        TicketReplyCreated::class => [SendReplyCreatedNotif::class],
        UsersDeleted::class => [DeleteUserRelations::class],
        UserCreated::class => [AddPurchaseCodeToNewUser::class],
    ];

    protected $subscribe = [TicketEventSubscriber::class];

    public function boot()
    {
        parent::boot();

        // update user purchases after login via envato or when connecting envato from account settings page
        Event::listen([SocialLogin::class, SocialConnected::class], function (
            SocialLogin|SocialConnected $event,
        ) {
            if ($event->socialName === 'envato') {
                $event->user->syncPurchases();
            }
        });
    }
}
