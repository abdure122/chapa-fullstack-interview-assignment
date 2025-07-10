<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessFakePayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $amount;

    public function __construct(User $user, $amount)
    {
        $this->user = $user;
        $this->amount = $amount;
    }

    public function handle()
    {
        $this->user->wallet_balance = bcadd($this->user->wallet_balance, $this->amount, 2);
        $this->user->save();
        Transaction::create([
            'user_id' => $this->user->id,
            'amount' => $this->amount,
            'type' => 'credit',
            'status' => 'completed',
        ]);
    }
}
