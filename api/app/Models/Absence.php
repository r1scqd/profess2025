<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    protected $fillable = [
        'user_id',
        'start_date',
        'stop_date',
        'justification',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function casts()
    {
        return [
            'start_date' => 'date',
            'stop_date' => 'date',
        ];
    }
}
