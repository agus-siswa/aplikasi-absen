<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     * superadmin,admin,guru -> ["superadmin","admin","guru"]
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, $roles): Response
    {

        $user = $request->user();

        if (! $user) {
            return response()->json([
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (! in_array($user->role, explode(',', $roles), true)) {
            return response()->json([
                'message' => 'Akses ditolak',
            ], 403);
        }

        return $next($request);
    }
}
