<?php namespace App\Http\Requests;

use Common\Core\BaseFormRequest;

class ModifyReplies extends BaseFormRequest
{
    public function rules(): array
    {
        if ($this->route('type') === 'drafts') {
            return [
                'body' => 'nullable|string|min:1',
                'status' => 'array',
                'attachments' => 'required_without:body|array|max:10',
                'attachments.*' =>
                    'required_without:body|integer|exists:file_entries,id',
            ];
        }

        return [
            'body' => 'required|string|min:1',
            'attachments' => 'array|max:5',
            'attachments.*' => 'integer|exists:file_entries,id',
        ];
    }

    public function messages(): array
    {
        $message =
            $this->route('type') === 'notes'
                ? __("Note can't be empty.")
                : __("Reply can't be empty.");
        return [
            'body.required' => $message,
        ];
    }
}
