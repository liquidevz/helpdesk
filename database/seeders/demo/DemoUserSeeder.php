<?php

namespace Database\Seeders;

use App\Models\User;
use Common\Auth\Permissions\Permission;
use Common\Auth\Roles\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    private array $emails;

    public function __construct()
    {
        $this->emails = json_decode(
            File::get(database_path('seeders/demo/emails.json')),
            true,
        );
    }

    public function run()
    {
        $this->seedSpecialDemoUsers();
        $userIds = $this->seedDemoCustomers();
        $this->attachCustomerGroupToUsers($userIds);
    }

    private function seedSpecialDemoUsers(): void
    {
        $password = 'demo';
        $adminPermissionId = Permission::where('name', 'admin')->first()->id;

        $adminUser = User::create([
            'email' => 'admin@demo.com',
            'password' => $password,
            'first_name' => $this->randomFirstName(),
            'last_name' => $this->randomLastName(),
        ]);
        $adminUser->permissions()->sync([$adminPermissionId]);

        $agentUser = User::create([
            'email' => 'agent@demo.com',
            'password' => $password,
            'first_name' => $this->randomFirstName(),
            'last_name' => $this->randomLastName(),
        ]);
        $agentRole = Role::where('name', 'agents')->first();
        $agentUser->roles()->attach($agentRole->id);
        $adminUser->roles()->attach($agentRole->id);

        $superAdmin = User::create([
            'email' => 'Ic0OdCIodqz8q1r@demo.com',
            'password' => config('common.site.demo_password'),
        ]);
        $superAdmin->permissions()->sync([$adminPermissionId]);
    }

    private function seedDemoCustomers(): Collection
    {
        $users = collect([]);
        $password = Hash::make('demo');

        for ($i = 0; $i <= 30; $i++) {
            $email = $i === 0 ? 'customer@demo.com' : $this->emails[$i];
            $users->push([
                'email' => $email,
                'first_name' => $this->randomFirstName(),
                'last_name' => $this->randomLastName(),
                'password' => $password,
            ]);
        }

        User::insert($users->toArray());

        return User::whereIn('email', $users->pluck('email'))
            ->get()
            ->pluck('id');
    }

    private function attachCustomerGroupToUsers(Collection $userIds): void
    {
        $customerGroup = Role::where('name', 'customers')->first();

        $pivot = $userIds
            ->map(function ($id) use ($customerGroup) {
                return ['user_id' => $id, 'role_id' => $customerGroup->id];
            })
            ->toArray();

        DB::table('user_role')->insert($pivot);
    }

    protected function randomFirstName()
    {
        $key = Arr::random(['firstNameMale', 'firstNameFemale']);
        return Arr::random(
            File::getRequire(database_path('seeders/demo/names.php'))[$key],
        );
    }

    protected function randomLastName()
    {
        return Arr::random(
            File::getRequire(database_path('seeders/demo/names.php'))[
                'lastName'
            ],
        );
    }

    protected function randomEmail()
    {
        return Arr::random(
            json_decode(
                File::get(database_path('seeders/demo/emails.json')),
                true,
            ),
        );
    }
}
