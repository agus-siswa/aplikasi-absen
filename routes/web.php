<?php

use Illuminate\Support\Facades\Route;

// semua path/url akan diarahkan ke file app.blade.php
// karena kita pakai SPA (SINGLE PAGE APLICATION)
// semua url akan diarahkan ke react router
Route::get('/{any}', function () {
    // ini di folder resources\views\app.blade.php
    return view('app');
    // memastikan agar semua url akan di handle oleh react router
})->where('any', '.*');
