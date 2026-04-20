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
// Protected Admin routes — wajib login
Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('blogs', BlogController::class)->except(['index']); // ← kecil

    Route::apiResource('services', ServiceController::class);

    Route::apiResource('testimonials', TestimoniController::class);
    Route::patch('testimonials/{id}/approve', [TestimoniController::class, 'approve']);

    Route::apiResource('contacts', ContactController::class);
    Route::patch('contacts/{id}/read',    [ContactController::class, 'markAsRead']);
    Route::patch('contacts/{id}/replied', [ContactController::class, 'markAsReplied']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/stats', function () {
        return response()->json([
            'blogs'        => \App\Models\Blog::count(),
            // 'services'     => \App\Models\Service::where('is_active', true)->count(),
            // 'testimonials' => \App\Models\Testimonial::count(),
            // 'contacts'     => \App\Models\Contact::where('status', 'new')->count(),
        ]);
    });
});
