<?php

use App\Models\Education;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('education_materials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('approval_date');
            $table->string('status');
            $table->string('type');
            $table->string('area');
            $table->foreignIdFor(User::class, 'author_id')->constrained('users');
            $table->foreignIdFor(Education::class)->constrained('education');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('education_materials');
    }
};
