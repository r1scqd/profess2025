<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'name',
        'date',
        'description',
        'author_id',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    protected function casts()
    {
        return [
            'date' => 'date',
        ];
    }
}
