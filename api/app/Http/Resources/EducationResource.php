<?php

namespace App\Http\Resources;

use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Education */
class EducationResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'start_date' => $this->start_date,
            'stop_date' => $this->stop_date,
            'responsible_id' => $this->responsible_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
