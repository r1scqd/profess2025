<?php

namespace App\Http\Resources;

use App\Models\DocumentComment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin DocumentComment */
class DocumentCommentResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'date_created' => $this->created_at,
            'date_updated' => $this->updated_at,
            'document_id' => $this->document_id,
            'author' => [
                'name' => $this->author->name,
                'position' => $this->author->position,
            ]
        ];
    }
}
