<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        view()->composer('*', function ($view) {
            $user = Auth::check() ? Auth::user() : '{}';
            view()->share('user', $user);
        });

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
