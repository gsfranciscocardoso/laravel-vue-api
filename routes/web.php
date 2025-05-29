<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// OAuth routes
Route::get('/auth/redirect', [AuthController::class, 'redirect']);
Route::get('/auth/callback', [AuthController::class, 'callback']);

// Static assets and other necessary routes
Route::get('/storage/{path}', function ($path) {
    // Handle file storage access if needed
})->where('path', '.*');

// SPA catch-all route (must be last)
Route::view('/{any}', 'app')
    ->where('any', '^(?!api|auth|sanctum|storage).*$')
    ->name('spa-entry');