<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditKelas;
use App\Http\Requests\TambahKelas;
use App\Models\Kelas;

class KelasController extends Controller
{
    public function getKelas()
    {
        // mendapatkan semua data kelas dari table kelas
        $kelas = Kelas::all();

        // menampilkan json kelas
        return response()->json([
            'status' => true,
            'message' => 'Mengambil data kelas',
            'data' => $kelas,
        ]);
    }

    public function addKelas(TambahKelas $request)
    {
        // mengambil data dari request / frontend / user
        $validated = $request->validated();
        // menambahkan data ke table kelas
        $kelas = Kelas::create($validated);

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil menambahkan data kelas',
            'data' => $kelas,
        ]);
    }

    public function updateKelas(EditKelas $request)
    {
        // mengambil data dari request / frontend / user
        $validated = $request->validated();
        // mencari data berdasarkan id
        $kelas = Kelas::find($validated['id']);
        // mengupdate data
        $kelas->update($validated);

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengupdate data kelas',
            'data' => $kelas,
        ]);
    }

    public function deleteKelas($id)
    {
        // mencari data berdasarkan id
        $kelas = Kelas::find($id);
        // menghapus data
        $kelas->delete();

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil menghapus data kelas',
        ]);
    }
}
