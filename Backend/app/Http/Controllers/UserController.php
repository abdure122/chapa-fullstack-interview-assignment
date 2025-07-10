<?php

namespace App\Http\Controllers;

use App\Http\Requests\InitiatePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Services\PaymentService;

class UserController extends Controller
{
    public function transactions()
    {
        $transactions = auth()->user()->transactions()->latest()->get();
        return PaymentResource::collection($transactions);
    }

    public function initiatePayment(InitiatePaymentRequest $request, PaymentService $paymentService)
    {
        info('Initiating payment', ['user_id' => $request->user()->id, 'amount' => $request->validated('amount')]);
        $transaction = $paymentService->initiatePayment($request->user(), $request->validated('amount'));
        return new PaymentResource($transaction);
    }
}
