<?php

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $admin = User::findAdmin();
        if ($admin) {
            Article::where('author_id', 0)
                ->orWhereNull('author_id')
                ->update([
                    'author_id' => $admin->id,
                ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
