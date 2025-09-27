<?php namespace App\Http\Controllers;

use App\Models\CannedReply;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CannedRepliesController extends BaseController
{
    public function index()
    {
        $this->authorize('index', CannedReply::class);

        $builder = CannedReply::with('attachments');

        if (request('with') === 'user') {
            $builder->with('user');
        }

        if ($userId = request('userId')) {
            $builder->where('user_id', $userId);

            if (request('shared')) {
                $builder->orWhere('shared', true);
            }
        }

        $pagination = (new Datasource($builder, request()->all()))->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    public function store()
    {
        $this->authorize('store', CannedReply::class);

        $userId = Auth::id();

        $data = $this->validate(request(), [
            'body' => 'required|string|min:3',
            'shared' => 'required|boolean',
            'name' => "required|string|min:3|max:255|unique:canned_replies,name,NULL,id,user_id,
                $userId",
            'attachments' => 'array|max:5|exists:file_entries,id',
        ]);

        $cannedReply = CannedReply::create([
            'body' => $data['body'],
            'name' => $data['name'],
            'shared' => $data['shared'],
            'user_id' => $userId,
        ]);

        if ($attachments = request('attachments')) {
            $cannedReply->attachments()->sync($attachments);
        }

        return $this->success(['cannedReply' => $cannedReply], 201);
    }

    public function update(int $id)
    {
        $cannedReply = CannedReply::findOrFail($id);

        $this->authorize('update', $cannedReply);

        $userId = Auth::id();

        $data = $this->validate(request(), [
            'body' => 'required|string|min:3',
            'shared' => 'boolean',
            'name' => "required|string|min:3|max:255|unique:canned_replies,name,$id,id,user_id,$userId",
            'attachments' => 'array|max:5',
            'attachments.*' => 'int|min:10',
        ]);

        $cannedReply
            ->fill([
                'body' => $data['body'],
                'name' => $data['name'],
                'shared' => $data['shared'],
            ])
            ->save();
        if ($attachments = request('attachments')) {
            $cannedReply->attachments()->sync($attachments);
        }

        return $this->success(['cannedReply' => $cannedReply]);
    }

    public function destroy(string $ids)
    {
        $replyIds = explode(',', $ids);
        $this->authorize('destroy', CannedReply::class);

        // detach attachments from canned replies
        DB::table('file_entry_models')
            ->where('model_type', CannedReply::MODEL_TYPE)
            ->whereIn('model_id', $replyIds)
            ->delete();

        CannedReply::whereIn('id', $replyIds)->delete();

        return $this->success();
    }
}
