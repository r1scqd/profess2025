<?php

namespace App\Http\Resources;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Document */
class DocumentResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category,
            'date_created' => $this->created_at,
            'date_updated' => $this->updated_at,
            'has_comments' => $this->comments()->count() > 0
        ];
    }
}
