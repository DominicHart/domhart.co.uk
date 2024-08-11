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
        Schema::create('tags', function (Blueprint $table) {
            $table->string('ulid');
            $table->string('title');
            $table->timestamps();
        });

        Schema::create('photo_tag', function (Blueprint $table) {
            $table->id();
            $table->string('photo_ulid');
            $table->string('tag_ulid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photo_tag');
        Schema::dropIfExists('tags');
    }
};
