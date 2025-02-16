<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EducationMaterial extends Model
{
    protected $fillable = [
        'name',
        'approval_date',
        'status',
        'type',
        'area',
        'author_id',
        'education_id',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function education()
    {
        return $this->belongsTo(Education::class);
    }
}
