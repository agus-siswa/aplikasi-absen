<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Controller untuk handle login
    public function auth(AuthRequest $request)
    {
        // ℹ️ mengambil data dari db berdasarkan username
        // 👾 $request->username adalah data yang berasal dari Front End
        // maksud dari first adalah mengambil data pertama yang cocok dengan username
        // karena username sifatnya unik maka first sudah cukup
        // ⚠️ jika username tidak ditemukan maka akan menghasilkan null
        $data = User::where('username', $request->username)->first();
        // jika data dari tabel user tidak null (username ditemukan)
        if ($data != null) {
            // ℹ️ mengecek apakah password yang diinputkan cocok dengan password yang ada di tabel user
            if (Hash::check($request->password, $data->password)) {
                // 👾 membuat token untuk user yang login
                // 👾 ['role:'.$data->role] = memberikan hak akses kepada user sesuai dengan role yang dimiliki
                // plainTextToken digunakan mengambil token berupa string untuk dikirim ke front end
                $token = $data->createToken('user', ['role:'.$data->role])->plainTextToken;

                // menampilkan pesan json login berhasil beserta token
                return response()->json([
                    'status' => true,
                    'message' => 'Login Berhasil',
                    // token dikirim ke front end untuk autentikasi request selanjutnya
                    'token' => $token,
                ]);
            }

            // ⚠️ jika password salah
            return response()->json([
                'status' => false,
                'message' => 'Password Salah',
            ], 401);
        } else {
            // ⚠️ jika username tidak ditemukan
            return response()->json([
                'status' => false,
                'message' => 'Username tidak ditemukan',
            ], 401);
        }
    }

    // Controller untuk mendapatkan user yang sedang login
    public function getCurrentUser(Request $request)
    {
        // ℹ️ mengambil data user yang sedang login
        // 👾 $request->user() digunakan untuk mendapatkan data user yang sedang login
        // 👾 $request->user() akan menghasilkan null jika user tidak login
        // 👾 $request->user() akan menghasilkan data user jika user login
        return response()->json([
            'status' => true,
            'message' => 'User ditemukan',
            'data' => $request->user(),
        ]);
    }
}
