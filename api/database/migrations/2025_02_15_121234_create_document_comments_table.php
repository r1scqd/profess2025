<?php

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('document_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Document::class)->constrained('documents');
            $table->foreignIdFor(User::class, 'author_id')->constrained('users');
            $table->text('text');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('document_comments');
    }
};
