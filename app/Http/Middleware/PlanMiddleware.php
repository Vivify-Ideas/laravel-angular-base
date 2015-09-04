<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class PlanMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check() && !Auth::user()->stripe_plan) {
            return ['redirect' => 'select-plan'];
        }

        return $next($request);
    }
}
