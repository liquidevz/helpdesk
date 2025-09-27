<?php

namespace App\Services\Ticketing;

use App\Models\Ticket;
use Illuminate\Support\Facades\DB;

class AddTagToTickets
{
    public function execute(array $ticketIds, string|int $tagId)
    {
        $rows = DB::table('taggables')
            ->whereIn('taggable_id', $ticketIds)
            ->where('tag_id', $tagId)
            ->where('taggable_type', Ticket::MODEL_TYPE)
            ->get();

        // remove ticket ids that already have specified tag attached
        foreach ($rows as $existingRel) {
            $key = array_search($existingRel->taggable_id, $ticketIds);
            if ($key !== false) {
                unset($ticketIds[$key]);
            }
        }

        $data = array_map(
            fn($id) => [
                'tag_id' => $tagId,
                'taggable_id' => $id,
                'taggable_type' => Ticket::MODEL_TYPE,
            ],
            $ticketIds,
        );

        DB::table('taggables')->insert($data);
    }
}
