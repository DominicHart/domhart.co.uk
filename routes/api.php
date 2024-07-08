<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PhotoController;

Route::get('/me', function (Request $request) {
    return 'this';
})->middleware('auth');

Route::post('contact', [ContactController::class, 'submit']);

Route::resource('photos', PhotoController::class);
