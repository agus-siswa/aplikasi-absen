<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function auth(AuthRequest $request)
    {

        $data = User::where('username', $request->username)->first();

        if ($data != null) {
            if (Hash::check($request->password, $data->password)) {
                $token = $data->createToken('user', ['role:'.$data->role])->plainTextToken;

                return response()->json([
                    'status' => true,
                    'message' => 'Login Berhasil',
                    'token' => $token,
                ]);
            }

            return response()->json([
                'status' => false,
                'message' => 'Password Salah',
            ], 401);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Username tidak ditemukan',
            ], 401);
        }

    }

    public function getCurrentUser(Request $request)
    {
        return response()->json([
            'status' => true,
            'message' => 'User ditemukan',
            'data' => $request->user(),
        ]);
    }
}
