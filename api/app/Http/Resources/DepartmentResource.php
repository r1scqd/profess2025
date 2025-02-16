<?php

namespace App\Http\Resources;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Department */
class DepartmentResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'manager_id' => $this->manager_id,
        ];
    }
}
