<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('dashboard');
});

Route::group(['middleware' => 'guest'], function () {

    // Authentication routes
    Route::post('auth/login', 'Auth\AuthController@postLogin');

    // Registration routes
    Route::post('auth/signup', 'Auth\AuthController@postRegister');

    // Password reset link request routes
    Route::post('password/email', 'Auth\PasswordController@postEmail');

    // Password reset routes
    Route::post('password/reset', 'Auth\PasswordController@postReset');
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('auth/logout', 'Auth\AuthController@getLogout');
    Route::resource('users', 'UsersController', ['only' => ['update']]);
    Route::put('users/{id}/password', 'UsersController@changePassword');
    Route::post('contacts/parse-from-csv', 'ContactsController@parseFromCsv');

    Route::put('users/{id}/plan', 'UsersController@changePlan');
    Route::put('users/{id}/plan/cancel', 'UsersController@cancelPlan');

    Route::group(['middleware' => 'hasPlan'], function () {
        Route::resource('users.cards', 'Billing\UserCardsController');
        Route::resource('users.invoices', 'Billing\UserInvoicesController');
    });

});

Route::resource('files', 'FilesController');
Route::post('javascript-errors', 'ErrorLogController@log');

Route::group(['prefix' => 'admin', 'middleware' => 'admin', 'namespace' => 'Admin'], function() {

    Route::get('/', 'DashboardController@index');
    Route::resource('/users', 'UsersController');

});

Route::resource('plans', 'PlansController');
