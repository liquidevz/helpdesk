<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Article;
use App\Models\Ticket;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Str;

class ActivityLogController extends BaseController
{
    public function index()
    {
        $this->authorize('index', Activity::class);

        $builder = Activity::with(['subject']);

        if ($userId = request('userId')) {
            $builder->where('causer_id', $userId);
        }

        $datasource = new Datasource($builder, request()->all());
        $datasource->order = ['col' => 'created_at', 'dir' => 'desc'];

        $pagination = $datasource->paginate();

        $pagination->transform(function (Activity $activity) {
            if ($activity->subject?->model_type === Ticket::MODEL_TYPE) {
                $activity->subject->subject = Str::limit(
                    $activity->subject->subject,
                    50,
                );
            }
            if ($activity->subject?->model_type === Article::MODEL_TYPE) {
                $activity->subject->makeHidden(['body']);
            }

            return $activity;
        });

        return $this->success(['pagination' => $pagination]);
    }
}
