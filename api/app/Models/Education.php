<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'name',
        'status',
        'start_date',
        'stop_date',
        'responsible_id',
    ];

    protected function casts()
    {
        return [
            'start_date' => 'timestamp',
            'stop_date' => 'timestamp',
        ];
    }
}
