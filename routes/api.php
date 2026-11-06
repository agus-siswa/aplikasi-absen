<?php

use App\Http\Controllers\AbsenController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// API Login
Route::post('/auth', [AuthController::class, 'auth']);
// API membatasi request yang harus login
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/absen/all', [AbsenController::class, 'allAbsen']);
    Route::post('/absen/masuk', [AbsenController::class, 'absenMasuk']);
    Route::post('/absen/keluar', [AbsenController::class, 'absenKeluar']);
    // API Mendapatkan User Yang Login
    Route::get('/currentUser', [AuthController::class, 'getCurrentUser']);

    // yang bisa akses API ini hanya role nya superadmin
    Route::middleware('role:superadmin')->group(function () {
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
        // insert bulk
        Route::post('/siswa/bulk', [SiswaController::class, 'bulkInsert']);

        // ambil semua data kelas
        Route::get('/user', [UserController::class, 'getUser']);
        // menambahkan data kelas
        Route::post('/user', [UserController::class, 'addUser']);
        // mengedit data kelas
        Route::put('/user', [UserController::class, 'updateUser']);
        // menghapus data kelas
        Route::delete('/user/{id}', [UserController::class, 'deleteUser']);

    });

    Route::get('/logout', [AuthController::class, 'logout']);
});
