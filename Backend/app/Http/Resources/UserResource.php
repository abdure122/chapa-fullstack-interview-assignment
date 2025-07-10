<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role ? $this->role->name : null,
            'wallet_balance' => $this->wallet_balance,
            'active' => $this->active ?? true,
        ];
    }
}
