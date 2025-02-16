<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('status');
            $table->timestamp('start_date');
            $table->timestamp('stop_date');
            $table->integer('responsible_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('education');
    }
};
