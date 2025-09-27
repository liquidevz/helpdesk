<?php

namespace App\Services\Triggers;

use App\Data\LoadStatusAndCategoryTags;
use App\Models\Action;
use App\Models\Condition;
use App\Models\Operator;
use Common\Auth\Actions\PaginateUsers;
use Illuminate\Support\Collection;

class LoadTriggerConfig
{
    public function execute(): array
    {
        $tags = (new LoadStatusAndCategoryTags())->execute();

        return [
            'conditions' => Condition::with('operators')->get(),
            'actions' => Action::orderBy('name', 'asc')->get(),
            'operators' => Operator::orderBy('name', 'asc')->get(),
            'actionOptions' => [
                'agent:id' => $this->agents(),
                'ticket:status' => $tags['statusTags']->map(
                    fn($tag) => [
                        'name' => $tag->display_name,
                        'value' => $tag->name,
                    ],
                ),
                'category:tags' => $tags['categoryTags']->map(
                    fn($tag) => [
                        'name' => $tag->display_name,
                        'value' => $tag->name,
                    ],
                ),
            ],
        ];
    }

    protected function agents(): Collection
    {
        //get all current agents
        $users = collect(
            (new PaginateUsers())
                ->execute([
                    'permission' => 'tickets.update',
                    'perPage' => 20,
                ])
                ->items(),
        );

        // we need only agent display name and id
        $users->transform(
            fn($user) => [
                'name' => $user->display_name,
                'description' => $user->email,
                'value' => $user->id,
                'image' => $user->avatar,
            ],
        );

        return $users;
    }
}
