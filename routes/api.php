<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimoniController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/blogs', [BlogController::class, 'index']);

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);
    });
});

// Protected Admin routes — wajib login
Route::middleware('auth:sanctum')->group(function () {

    // Blog — index & show publik, sisanya protected
    Route::apiResource('Blogs', BlogController::class)->except(['index']);

    // Layanan
    Route::apiResource('services', ServiceController::class);

    // Testimoni
    Route::apiResource('testimonials', TestimoniController::class);
    Route::patch('testimonials/{id}/approve', [TestimoniController::class, 'approve']);

    // Kontak
    Route::apiResource('contacts', ContactController::class);
    Route::patch('contacts/{id}/read',    [ContactController::class, 'markAsRead']);
    Route::patch('contacts/{id}/replied', [ContactController::class, 'markAsReplied']);
});