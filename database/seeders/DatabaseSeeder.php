<?php

namespace Database\Seeders;

use App\Models\User;
use Common\Auth\Roles\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(TagTableSeeder::class);
        $this->call(TriggersTableSeeder::class);

        $adminUser = app(User::class)->findAdmin();
        $agentRole = Role::where('name', 'agents')->first();
        if ($adminUser && $agentRole) {
            $adminUser->roles()->sync([$agentRole->id], false);
        }
    }
}
