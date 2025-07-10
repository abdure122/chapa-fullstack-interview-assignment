<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Models\Transaction;

class AdminController extends Controller
{


    public function transactions()
    {
        $transactions = Transaction::with('user')->get();
        return TransactionResource::collection($transactions);
    }

    public function users()
    {
        $users = User::with('role')->get();
        return UserResource::collection($users);
    }

    public function toggle($id)
    {
        $user = User::findOrFail($id);
        $user->active = !$user->active;
        $user->save();
        return new UserResource($user);
    }

    public function paymentsSummary()
    {
        $summary = User::with('transactions')->get()->map(function ($user) {
            return [
                'user' => $user->name,
                'total_payments' => $user->transactions->where('type', 'credit')->sum('amount'),
            ];
        });
        return response()->json(['data' => $summary, 'success' => true]);
    }
}
