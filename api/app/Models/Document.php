<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    protected $fillable = [
        'title',
        'category',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(DocumentComment::class);
    }
}
