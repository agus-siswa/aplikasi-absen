<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditSiswa;
use App\Http\Requests\TambahSiswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SiswaController extends Controller
{
    public function getSiswa()
    {
        // mendapatkan semua data kelas dari table kelas
        $siswa = User::getSiswa();

        // menampilkan json kelas
        return response()->json([
            'status' => true,
            'message' => 'Mengambil data siswa',
            'data' => $siswa,
        ]);
    }

    public function addSiswa(TambahSiswa $request)
    {
        // mengambil data dari request / frontend / user
        $validated = $request->validated();

        // menambahkan data ke table kelas
        $siswa = User::create(
            array_merge(
                ['role' => 'siswa'],
                $validated
            )
        );

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil menambahkan data siswa',
            'data' => $siswa,
        ]);
    }

    public function updateSiswa(EditSiswa $request)
    {
        // mengambil data dari request / frontend / user
        $validated = $request->validated();
        // jika password diisi maka
        // isset -> menandakan object tersebut benar2 ada bukan null | undefined
        if (isset($validated['password'])) {
            // ubah jadi hash
            $validated['password'] = Hash::make($validated['password']);
        } else {
            // tidak mengubah password

            // jika tidak hapus aja dari validated
            unset($validated['password']);
        }
        // mencari data berdasarkan id

        $siswa = User::find($validated['id']);
        // mengupdate data
        $siswa->update($validated);

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengupdate data siswa',
            'data' => $validated,
        ]);
    }

    public function deleteSiswa($id)
    {
        // mencari data berdasarkan id
        $siswa = User::find($id);
        // menghapus data
        $siswa->delete();

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil menghapus data siswa',
        ]);
    }
}
