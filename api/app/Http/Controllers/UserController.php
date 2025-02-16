<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function list()
    {
        return response()->json(User::query()->with('department')->get());
    }

    public function userInfo($id)
    {
        $user = User::findOrFail($id);
        return [
            'users_in' => $user->department->users()->get()
        ];
    }

    public function save($id, Request $request)
    {
        $user = User::findOrFail($id);
        $entry = $request->validate([
            'name' => ['required', 'string'],
            'phone' => ['nullable', 'string'],
            'work_phone' => ['nullable', 'string'],
            'birthday' => ['required', 'date'],
            'position' => ['required', 'string'],
            'department_id' => ['required'],
            'manager_id' => ['nullable'],
            'helper_id' => ['nullable'],
            'email' => ['required', 'string'],
            'cabinet' => ['required', 'string'],
            'additional_info' => ['nullable', 'string']
        ]);
        $user->fill($entry);
        $user->save();
        return response()->json($user);
    }

    public function add(Request $request)
    {
        $entry = $request->validate([
            'name' => ['required', 'string'],
            'phone' => ['nullable', 'string'],
            'work_phone' => ['nullable', 'string'],
            'birthday' => ['required', 'date'],
            'position' => ['required', 'string'],
            'department_id' => ['required'],
            'manager_id' => ['nullable'],
            'helper_id' => ['nullable'],
            'email' => ['required', 'string'],
            'cabinet' => ['required', 'string'],
            'additional_info' => ['nullable', 'string']
        ]);
        $user = new User();
        $user->fill($entry);
        $user->save();
        return response()->json($user);
    }

    public function dismissUser($id)
    {
        $user = User::findOrFail($id);
        if ($user->education()->where('start_date', '>', now())->exists()) {
            return response()->json([
                'error' => 'У сотрудника есть обучения в будущем'
            ], 415);
        }
        $user->vacations()->where('start_date', '>', now())->delete();
        $user->absences()->where('start_date', '>', now())->delete();
        $user->dismissal_date = now();
        $user->save();
        return response()->json();
    }

    public function events($id, Request $request)
    {
        $user = User::findOrFail($id);
        $start = now();
        $stop = now()->addDay();
        if ($request->has('past')) {
            $start = Carbon::createFromTimestamp(10);
        }
        if ($request->has('future')) {
            $stop = new \Illuminate\Support\Carbon('4020-02-02');
        }
        return response()->json([
            'vacations' => $user->vacations()->whereBetween('start_date', [$start, $stop])->get(),
            'absences' => $user->absences()->whereBetween('start_date', [$start, $stop])->get(),
            'education' => $user->education()->whereBetween('start_date', [$start, $stop])->get(),
        ]);
    }

    public function addEvent($id, Request $request)
    {
        $user = User::findOrFail($id);
        $entry = $request->validate([
            'type' => ['required', 'string'],
            'start_date' => ['required', 'date'],
            'stop_date' => ['required', 'date'],
            'justification' => ['nullable', 'string'],
        ]);

        switch ($entry['type']) {
            case 'vacations':
                $user->vacations()->create($entry);
                break;
            case 'absences':
                $user->absences()->create($entry);
                break;
            case 'education':
                $user->education()->create($entry);
        }
        return response()->json();


    }

    public function makeIcs($id)
    {
        $user = User::findOrFail($id);
        $p = \Storage::disk('public');
        $p->makeDirectory('users_ics');
        $fio = explode(' ', trim($user->name));
        $toSave = $p->path('users_ics/' . $id . '.ics');
        file_put_contents($toSave, "BEGIN:VCARD
VERSION:3.0
N:{$fio[1]}
FN:{$fio[0]}
ORG:ГК Дороги России
TITLE:{$user->position}
TEL;WORK;VOICE:{$user->work_phone}
TEL;CELL:{$user->phone}
EMAIL;WORK;INTERNET:{$user->email}
END:VCARD");
        return \Response::download($toSave);
    }
}
