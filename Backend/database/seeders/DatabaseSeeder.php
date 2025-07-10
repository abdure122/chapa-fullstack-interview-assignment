<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = [
            'User',
            'Admin',
            'Super Admin',
        ];
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        $userRole = Role::where('name', 'User')->first();
        $adminRole = Role::where('name', 'Admin')->first();
        $superAdminRole = Role::where('name', 'Super Admin')->first();

        $users = [];
        $admins = [];
        $superAdmins = [];

        for ($i = 1; $i <= 3; $i++) {
            $users[] = User::factory()->create([
                'name' => "Normal User $i",
                'email' => "user$i@chapa.co",
                'password' => Hash::make('password'),
                'role_id' => $userRole->id,
                'wallet_balance' => 100.00 * $i,
            ]);
            $admins[] = User::factory()->create([
                'name' => "Admin User $i",
                'email' => "admin$i@chapa.co",
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
                'wallet_balance' => 500.00 * $i,
            ]);
            $superAdmins[] = User::factory()->create([
                'name' => "Super Admin $i",
                'email' => "superadmin$i@chapa.co",
                'password' => Hash::make('password'),
                'role_id' => $superAdminRole->id,
                'wallet_balance' => 1000.00 * $i,
            ]);
        }

        foreach (array_merge($users, $admins, $superAdmins) as $u) {
            Transaction::create([
                'user_id' => $u->id,
                'amount' => 50.00,
                'type' => 'debit',
                'status' => 'completed',
            ]);
            Transaction::create([
                'user_id' => $u->id,
                'amount' => 20.00,
                'type' => 'debit',
                'status' => 'completed',
            ]);
            Transaction::create([
                'user_id' => $u->id,
                'amount' => 100.00,
                'type' => 'debit',
                'status' => 'completed',
            ]);
        }
    }
}
