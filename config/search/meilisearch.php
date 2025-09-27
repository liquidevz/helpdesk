<?php

use App\Models\Ticket;

return [
    Ticket::class => [
        'stopWords' => ['the', 'a', 'an'],
        'rankingRules' => [
            'updated_at:desc',
            'words',
            'typo',
            'proximity',
            'attribute',
            'exactness',
        ],
    ],
];
