<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

#[Fillable([
    'username',
    'password',
    'id_kelas',
    'nama',
    'no_hp',
    'nip',
    'role',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // relasi ke table kelas
    public static function getSiswa()
    {
        // "SELECT users.id, users.username, users.nama, users.no_hp, users.nip, users.role, table_kelas.nama as nama_kelas FROM users INNER JOIN table_kelas ON users.id_kelas = table_kelas.id WHERE users.role = 'siswa'"
        return DB::table('users')->select(
            'users.id',
            'users.username',
            'users.nama',
            'users.no_hp',
            'users.nip',
            'users.role',
            'table_kelas.nama as nama_kelas',
            'users.id_kelas',
        )->join('table_kelas', 'users.id_kelas', '=', 'table_kelas.id')
            ->where('users.role', 'siswa')->get();
    }

    public static function insertArraySiswa($data)
    {
        return DB::table('users')->insert($data);
    }
}
