<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Reply;
use App\Models\Tag;
use App\Models\Ticket;
use App\Models\User;
use Common\Auth\Roles\Role;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class DemoTicketsSeeder extends Seeder
{
    private int $ticketCount = 60;

    public function __construct(
        protected User $user,
        protected Role $role,
        protected Tag $tag,
        protected Ticket $ticket,
        protected Reply $reply,
        protected Filesystem $fs,
    ) {
    }

    public function run()
    {
        $tickets = $this->seedDemoTickets();
        $tagNames = $this->seedDemoTicketCategories();
        $this->attachTagsToTickets($tagNames, $tickets);
        $this->seedDemoReplies($tickets);

        $agent = User::where('email', 'agent@demo.com')->first();
        $admin = User::where('email', 'admin@demo.com')->first();
        Ticket::whereIn('id', $tickets->random(10)->pluck('id'))->update(
            [
                'assigned_to' => $agent->id,
            ],
            ['timestamps' => false],
        );
        Ticket::whereIn('id', $tickets->random(10)->pluck('id'))->update(
            [
                'assigned_to' => $admin->id,
            ],
            ['timestamps' => false],
        );
    }

    private function seedDemoTickets(): Collection
    {
        $subjects = json_decode(
            File::get(database_path('seeders/demo/demo-ticket-subjects.json')),
            true,
        );
        $customers = Role::with('users')
            ->where('name', 'customers')
            ->first()->users;

        $tickets = [];

        for ($i = 0; $i <= $this->ticketCount; $i++) {
            $date = now()->addDays(-rand(1, 30));
            $status = Arr::random(['open', 'pending', 'closed']);
            $tickets[] = [
                'subject' => Arr::random($subjects),
                'user_id' => $customers->random()->id,
                'status' => $status,
                'closed_at' =>
                    $status === 'closed' ? $date->addDays(rand(1, 8)) : null,
                'created_at' => $date,
                'updated_at' => $date,
            ];
        }

        Ticket::insert($tickets);

        return Ticket::whereIn('subject', $subjects)->get();
    }

    private function seedDemoTicketCategories()
    {
        Tag::where('name', 'general')->delete();

        $demoCategories = json_decode(
            File::get(database_path('seeders/demo/demo-categories.json')),
            true,
        );

        collect($demoCategories['parents'])
            ->each(function ($name) {
                $tag = Tag::create([
                    'name' => $name,
                    'display_name' => $name,
                    'type' => 'category',
                ]);
                $category = Category::where('name', $tag->name)->first();
                $tag->categories()->attach($category->id);
            })
            ->toArray();

        return $demoCategories['parents'];
    }

    /**
     * Attach random category and status tags to all example tickets.
     */
    private function attachTagsToTickets(
        array $tagNames,
        Collection $tickets,
    ): void {
        $tags = $this->tag->whereIn('name', $tagNames)->get();

        $pivot = $tags
            ->map(function (Tag $tag, int $index) use ($tickets) {
                $chunk = $tickets->slice($index * 10, 10);
                return $chunk->map(function (Ticket $ticket) use ($tag) {
                    return [
                        [
                            'tag_id' => $tag->id,
                            'taggable_id' => $ticket->id,
                            'taggable_type' => Ticket::MODEL_TYPE,
                        ],
                    ];
                });
            })
            ->flatten(2)
            ->toArray();

        DB::table('taggables')->insert($pivot);
    }

    private function seedDemoReplies(Collection $tickets): void
    {
        $bodies = json_decode(
            File::get(database_path('seeders/demo/demo-reply-bodies.json')),
            true,
        );
        $agent = User::where('email', 'agent@demo.com')->first();

        $replies = $tickets
            ->map(function (Ticket $ticket) use ($bodies, $agent) {
                return collect($bodies)
                    ->random(10)
                    ->map(function ($body, $index) use ($ticket, $agent) {
                        $isEven = $index % 2 == 0;
                        $date = now()->addHours(rand(-1, -24));

                        return [
                            'body' => $body,
                            'user_id' => $isEven
                                ? $agent->id
                                : $ticket->user_id,
                            'ticket_id' => $ticket->id,
                            'created_at' => $date,
                            'updated_at' => $date,
                            'uuid' => Str::random(30),
                        ];
                    });
            })
            ->flatten(1)
            ->toArray();

        Reply::insert($replies);
    }
}
