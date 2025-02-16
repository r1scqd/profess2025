<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Department extends Model
{
    protected $fillable = [
        'name',
        'description',
        'manager_id',
    ];

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function children()
    {
        return $this->hasMany(Department::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Department::class, 'parent_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'department_id');
    }

    public function fetchUsers(Collection &$users)
    {
        $users->push(...$this->users()->with('department')->get());
        $this->children->each(function ($item) use ($users) {
            $item->fetchUsers($users);
        });
    }

    public function fetchChildren()
    {
        $this->load('children');
        $this->children->each(function ($item) {
            $item->fetchChildren();
        });
    }
}
