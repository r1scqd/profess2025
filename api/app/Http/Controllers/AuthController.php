<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function signIn(Request $request)
    {
        $entry = $request->validate([
            'name' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
        if (\Auth::attempt([
            'email' => $entry['name'],
            'password' => $entry['password'],
        ])) {
            /** @var User $user */
            $user = \Auth::user();
            return response()->json([
                'token' => $user->createToken('api')->plainTextToken
            ]);
        } else {
            return response()->json([
                'timestamp' => now()->timestamp,
                'message' => 'Неверный логин или пароль',
                'errorCode' => 1005
            ], 403);
        }
    }
}
