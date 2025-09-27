<?php namespace App\Http\Validators;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Validator;

class TriggerStoreValidator
{
    public function __construct(
        /**
         * Laravel request instance.
         */
        private Request $request
    )
    {
    }

    /**
     * Validate TriggerController Store method.
     * @throws ValidationException
     */
    public function validate()
    {
        $validator = Validator::make($this->request->all(), [
            'name'    => 'required|unique:triggers|min:1|max:250',
            'conditions' => 'required|array',
            'conditions.*.value' => 'required|max:255',
            'conditions.*.match_type' => 'required|in:any,all',
            'actions' => 'required|array',
            'actions.*.value' => 'required|max:255',
        ], [
            'conditions.required' => 'Trigger must have at least one condition.',
            'conditions.*.value.required' => 'Condition value field can\'t be empty.',
            'actions.*.value.required' => 'Action value field can\'t be empty.',
        ]);

        if ($validator->fails()) {
            $messages = $validator->getMessageBag()->messages();

            throw new ValidationException($validator, new JsonResponse(['status' => 'error', 'messages' => $messages], 422));
        }
    }
}
