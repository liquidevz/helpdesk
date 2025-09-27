<?php namespace App\Http\Controllers;

use App\Http\Requests\ModifyTrigger;
use App\Models\Trigger;
use App\Services\Triggers\CreateTrigger;
use App\Services\Triggers\LoadTrigger;
use App\Services\Triggers\LoadTriggerConfig;
use App\Services\Triggers\UpdateTrigger;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Facades\DB;

class TriggerController extends BaseController
{
    public function index()
    {
        $this->authorize('index', Trigger::class);

        $datasource = new Datasource(Trigger::query(), request()->all());

        return $this->success(['pagination' => $datasource->paginate()]);
    }

    public function show(Trigger $trigger)
    {
        $this->authorize('index', $trigger);

        $trigger = (new LoadTrigger())->execute($trigger);

        return $this->success(['trigger' => $trigger]);
    }

    public function store(ModifyTrigger $request)
    {
        $this->authorize('store', Trigger::class);

        $trigger = (new CreateTrigger())->execute($request->validated());

        return $this->success(['trigger' => $trigger]);
    }

    public function update(Trigger $trigger, ModifyTrigger $request)
    {
        $this->authorize('update', $trigger);

        $trigger = (new UpdateTrigger())->execute(
            $trigger,
            $request->validated(),
        );

        return $this->success(['trigger' => $trigger]);
    }

    public function destroy(string $ids)
    {
        $ids = explode(',', $ids);
        $this->authorize('destroy', Trigger::class);

        DB::table('trigger_condition')
            ->whereIn('trigger_id', $ids)
            ->delete();
        DB::table('trigger_action')
            ->whereIn('trigger_id', $ids)
            ->delete();

        Trigger::whereIn('id', $ids)->delete();

        return response(null, 204);
    }

    public function config()
    {
        $this->authorize('store', Trigger::class);

        return $this->success((new LoadTriggerConfig())->execute());
    }
}
