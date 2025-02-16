<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentComment extends Model
{
    protected $fillable = [
        'document_id',
        'author_id',
        'text',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
