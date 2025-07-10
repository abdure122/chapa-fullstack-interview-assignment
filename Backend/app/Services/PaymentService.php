<?php

namespace App\Services;

use App\Models\User;
use App\Models\Transaction;

class PaymentService
{
    public function initiatePayment(User $user, $amount)
    {
        return \DB::transaction(function () use ($user, $amount) {
            $user->wallet_balance = bcadd((string)$user->wallet_balance, (string)$amount, 2);
            $user->save();
            return Transaction::create([
                'user_id' => $user->id,
                'amount' => $amount,
                'type' => 'credit',
                'status' => 'completed',
            ]);
        });
    }
}
