<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['tipe', 'id_user', 'id_operator'])]
class Absen extends Model
{
    use HasFactory;

    protected $table = 'table_absen';
}
