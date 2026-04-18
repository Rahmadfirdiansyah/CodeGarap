<?php

use Illuminate\Support\Facades\Route;

// Semua request ke blade, Vue yang handle routing
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
