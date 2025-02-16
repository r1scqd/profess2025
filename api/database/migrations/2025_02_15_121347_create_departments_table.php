<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->foreignIdFor(User::class, 'manager_id')->constrained('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('departments');
    }
};
