<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('table_absen', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->string('tipe'); // absen_masuk | absen_keluar
            $table->integer('id_operator');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_absen');
    }
};
