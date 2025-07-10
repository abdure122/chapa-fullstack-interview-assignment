<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => $this->user?->name ?? 'Unknown User',
            'amount' => $this->amount,
            'type' => $this->type,
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
