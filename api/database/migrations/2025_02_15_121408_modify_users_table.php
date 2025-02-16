<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable();
            $table->date('birthday')->nullable();
            $table->foreignId('department_id')->constrained('departments');
            $table->string('position');
            $table->foreignId('manager_id')->nullable()->constrained('users');
            $table->foreignId('helper_id')->nullable()->constrained('users');
            $table->string('work_phone', 20);
            $table->string('cabinet', 10);
            $table->text('additional_info')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
