<?php

use Illuminate\Support\Facades\Route;

// semua path/url akan diarahkan ke file app.blade.php
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
