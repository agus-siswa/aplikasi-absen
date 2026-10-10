<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/auth', [AuthController::class, 'auth']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/currentUser', [AuthController::class, 'getCurrentUser']);
});
