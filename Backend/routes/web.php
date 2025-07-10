<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SuperAdminController;


Route::get('/', function () {
    return view('welcome');
});


 Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');


    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
        Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('user')->middleware('role:User')->group(function () {
            Route::get('/transactions', [UserController::class, 'transactions']);
            Route::post('/payments/initiate', [UserController::class, 'initiatePayment']);
        });
        Route::prefix('admin')->middleware('role:Admin')->group(function () {
            Route::get('/users', [AdminController::class, 'users']);
            Route::post('/users/{id}/toggle', [AdminController::class, 'toggle']);
            Route::get('/payments/summary', [AdminController::class, 'paymentsSummary']);
        });
        Route::prefix('superadmin')->middleware('role:Super Admin')->group(function () {
            Route::get('/stats', [SuperAdminController::class, 'stats']);
            Route::post('/admins', [SuperAdminController::class, 'promoteToAdmin']);
            Route::delete('/admins/{id}', [SuperAdminController::class, 'removeAdmin']);
        });
    });