<?php

namespace App\Http\Resources;

use App\Models\UserEducation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin UserEducation */
class UserEducationResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'start_date' => $this->start_date,
            'stop_date' => $this->stop_date,
            'justification' => $this->justification,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'user_id' => $this->user_id,
        ];
    }
}
