<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [AuthController::class, 'authCheck']);
});

Route::post('contact', [ContactController::class, 'submit']);

Route::post('photos/save-positions', [PhotoController::class, 'savePhotoPositions']);
Route::resource('photos', PhotoController::class);
