<?php

namespace App\Services;

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data)
    {
        $role = Role::where('name', 'User')->first();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $role->id,
            'wallet_balance' => 0,
        ]);
        return $user;
    }
}
