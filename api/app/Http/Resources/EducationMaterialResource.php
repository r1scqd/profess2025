<?php

namespace App\Http\Resources;

use App\Models\EducationMaterial;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin EducationMaterial */
class EducationMaterialResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'approval_date' => $this->approval_date,
            'status' => $this->status,
            'type' => $this->type,
            'area' => $this->area,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'author_id' => $this->author_id,
            'education_id' => $this->education_id,

            'education' => new EducationResource($this->whenLoaded('education')),
        ];
    }
}
