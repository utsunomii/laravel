<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePriorityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'priority' => 'required|integer|min:1|max:100',
        ];
    }

    public function messages()
    {
        return [
            'priority.required' => 'Priority is required.',
            'priority.integer' => 'Priority must be an integer.',
            'priority.min' => 'Priority must be at least 1.',
            'priority.max' => 'Priority may not be greater than 100.',
        ];
    }

}
