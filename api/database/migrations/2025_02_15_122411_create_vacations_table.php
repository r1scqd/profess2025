<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('vacations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained('users');
            $table->date('start_date');
            $table->date('stop_date');
            $table->string('justification')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vacations');
    }
};
