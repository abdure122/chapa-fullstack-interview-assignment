<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function register(RegisterRequest $request, AuthService $authService)
    {
        $user = $authService->register($request->validated());

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        return new UserResource($request->user());
    }
}
