<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditUser;
use App\Http\Requests\TambahUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUser()
    {
        // mendapatkan semua data kelas dari table kelas
        $user = User::where('role', '!=', 'siswa')->get();

        // menampilkan json kelas
        return response()->json([
            'status' => true,
            'message' => 'Mengambil data user',
            'data' => $user,
        ]);
    }

    public function addUser(TambahUser $request)
    {
        // mengambil data dari request / frontend / user
        $validated = $request->validated();

        // menambahkan data ke table kelas
        $user = User::create($validated);

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil menambahkan data siswa',
            'data' => $user,
        ]);
    }

    public function updateUser(EditUser $request)
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

        $user = User::find($validated['id']);
        // mengupdate data
        $user->update($validated);

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengupdate data user',
            'data' => $validated,
        ]);
    }

    public function deleteUser($id)
    {
        // mencari data berdasarkan id
        $user = User::find($id);
        // menghapus data
        $user->delete();

        // menampilkan pesan berhasil
        return response()->json([
            'status' => true,
            'message' => 'Berhasil menghapus data user',
        ]);
    }
}
