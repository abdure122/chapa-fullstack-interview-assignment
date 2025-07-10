<?php

namespace App\Http\Resources;

class PaymentResource extends BaseApiResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => $this->user?->name,
            'amount' => $this->amount,
            'type' => $this->type,
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
