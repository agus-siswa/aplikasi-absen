<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;

// API Login
Route::post('/auth', [AuthController::class, 'auth']);
// API membatasi request yang harus login
Route::middleware('auth:sanctum')->group(function () {
    // API Mendapatkan User Yang Login
    Route::get('/currentUser', [AuthController::class, 'getCurrentUser']);

    // ambil semua data kelas
    Route::get('/kelas', [KelasController::class, 'getKelas']);
    // menambahkan data kelas
    Route::post('/kelas', [KelasController::class, 'addKelas']);
    // mengedit data kelas
    Route::put('/kelas', [KelasController::class, 'updateKelas']);
    // menghapus data kelas
    Route::delete('/kelas/{id}', [KelasController::class, 'deleteKelas']);

    // ambil semua data kelas
    Route::get('/siswa', [SiswaController::class, 'getSiswa']);
    // menambahkan data kelas
    Route::post('/siswa', [SiswaController::class, 'addSiswa']);
    // mengedit data kelas
    Route::put('/siswa', [SiswaController::class, 'updateSiswa']);
    // menghapus data kelas
    Route::delete('/siswa/{id}', [SiswaController::class, 'deleteSiswa']);

    Route::post('/siswa/bulk', [SiswaController::class, 'bulkInsert']);
});
