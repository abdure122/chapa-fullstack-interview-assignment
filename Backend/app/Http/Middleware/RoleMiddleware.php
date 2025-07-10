<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
   
public function handle(Request $request, Closure $next, ...$roles)
{
    $user = $request->user();
    if (!$user) {
        abort(403, 'Unauthorized.');
    }

    // Support multiple roles, e.g. 'role:Admin,Super Admin'
    $roleNames = is_array($roles) ? $roles : explode(',', $roles);
    $roleIds = \App\Models\Role::whereIn('name', $roleNames)->pluck('id')->toArray();

    if (!in_array($user->role_id, $roleIds)) {
        abort(403, 'Unauthorized.');
    }

    return $next($request);
}
}
