<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;

class SuperAdminController extends Controller
{

    public function users()
    {
        $users = User::with('role')->get();
        return UserResource::collection($users);
    }

     public function admins()
    {
        $users = User::with('role')->where('role_id', Role::where('name', 'Admin')->first()->id)->get();
        info($users);
        return UserResource::collection($users);
    }
    public function stats()
    {
        $totalPayments = DB::table('transactions')->where('type', 'credit')->sum('amount');
        $activeUserCount = User::where('active', true)->count();
        return response()->json([
            'total_payments' => $totalPayments,
            'active_user_count' => $activeUserCount,
        ]);
    }

    public function promoteToAdmin(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        $adminRole = Role::where('name', 'Admin')->first();
        $user->role_id = $adminRole->id;
        $user->save();
        return new UserResource($user);
    }

    public function removeAdmin($id)
    {
        $user = User::findOrFail($id);
        $userRole = Role::where('name', 'User')->first();
        $user->role_id = $userRole->id;
        $user->save();
        return new UserResource($user);
    }
}
