<?php

namespace App\Services\Admin;

use App\Models\Article;
use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Database\Metrics\ValueMetric;

class GetAnalyticsHeaderData implements GetAnalyticsHeaderDataAction
{
    public function execute(array $params): array
    {
        return [
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
                            ],
                        ],
                    ],
                    'name' => __('New users'),
                ],
                (new ValueMetric(
                    User::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' => 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z',
                            ],
                        ],
                    ],
                    'name' => __('Total tickets'),
                ],
                (new ValueMetric(
                    Ticket::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' => 'M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z',
                            ],
                        ],
                    ],
                    'name' => __('Total articles'),
                ],
                (new ValueMetric(
                    Article::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' => 'm21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01 4 11V4h7v-.01l9 9-7 7.02z',
                            ],
                        ],
                    ],
                    'name' => __('Total categories'),
                ],
                (new ValueMetric(
                    Category::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
        ];
    }
}
