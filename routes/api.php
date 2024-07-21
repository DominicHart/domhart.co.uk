<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::resource('photos', PhotoController::class);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [AuthController::class, 'authCheck']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('photos/save-positions', [PhotoController::class, 'savePhotoPositions']);
    Route::post('photos/delete', [PhotoController::class, 'destroy']);
});