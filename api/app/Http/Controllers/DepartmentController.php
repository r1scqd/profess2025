<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Support\Collection;

class DepartmentController extends Controller
{
    public function departments()
    {
        $deps = Department::query()->whereNull('parent_id')->get();
        foreach ($deps as $dep) {
            $dep->fetchChildren();
        }
        return response()->json([
            'departments' => [
                'name' => 'Дороги россии',
                'children' => $deps,
                'id' => -1
            ],
            'flat' => Department::all()
        ]);
    }

    public function getDepUsers($id)
    {
        $dep = Department::findOrFail($id);
        $users = new Collection();
        $dep->fetchUsers($users);
        return response()->json([
            'users' => $users->toArray(),
            'users_in' => $dep->users->toArray()
        ]);
    }
}
