<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/v1/signIn', [AuthController::class, 'signIn']);

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => '/v1'
], function () {
    Route::get('/Documents', [\App\Http\Controllers\DocumentController::class, 'documents']);
    Route::get('/Document/{id}/Comments', [\App\Http\Controllers\DocumentController::class, 'documentComments']);
    Route::post('/Document/{id}/Comment', [\App\Http\Controllers\DocumentController::class, 'sendComment']);
});


Route::group([
    'prefix' => '/v1'
], function () {
    Route::get('/departments', [\App\Http\Controllers\DepartmentController::class, 'departments']);

    Route::get('/department/{id}/users', [\App\Http\Controllers\DepartmentController::class, 'getDepUsers']);

    Route::get('/user/{id}/info', [\App\Http\Controllers\UserController::class, 'userInfo']);
    Route::post('/user/{id}', [\App\Http\Controllers\UserController::class, 'save']);
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'add']);
    Route::delete('/user/{id}/dismiss', [\App\Http\Controllers\UserController::class, 'dismissUser']);
    Route::get('/user/{id}/events', [\App\Http\Controllers\UserController::class, 'events']);
    Route::post('/user/{id}/event', [\App\Http\Controllers\UserController::class, 'addEvent']);
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'list']);
    Route::get('/user/{id}/ics', [\App\Http\Controllers\UserController::class, 'makeIcs']);

    Route::get('/events', [\App\Http\Controllers\EventController::class, 'events']);
    Route::get('/event/{id}/ics', [\App\Http\Controllers\EventController::class, 'makeIcs']);
});


