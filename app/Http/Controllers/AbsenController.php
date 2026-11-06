<?php

namespace App\Http\Controllers;

use App\Http\Requests\AbsenKeluar;
use App\Http\Requests\AbsenMasuk;
use App\Models\Absen;

class AbsenController extends Controller
{
    // ambil semua
    public function allAbsen()
    {
        $data = Absen::all();

        return response()->json([
            'status' => true,
            'message' => 'Mengambil data Absen',
            'data' => $data,
        ]);
    }

    public function absenMasuk(AbsenMasuk $request)
    {
        $reqData = $request->validated();
        $user = $request->user();

        $data = [
            'tipe' => 'absen_masuk',
            'id_user' => $reqData['id_user'],
            'id_operator' => $user->id,
        ];

        Absen::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Absen masuk berhasil',
            'data' => $data,
        ]);
    }

    public function absenKeluar(AbsenKeluar $request)
    {
        $reqData = $request->validated();
        $user = $request->user();

        $data = [
            'tipe' => 'absen_keluar',
            'id_user' => $reqData['id_user'],
            'id_operator' => $user->id,
        ];

        Absen::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Absen keluar berhasil',
            'data' => $data,
        ]);
    }
}
