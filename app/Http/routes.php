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
    Route::get('password/email', 'Auth\PasswordController@getEmail');
    Route::post('password/email', 'Auth\PasswordController@postEmail');

    // Password reset routes
    Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');
    Route::post('password/reset', 'Auth\PasswordController@postReset');
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('auth/logout', 'Auth\AuthController@getLogout');
});

Route::resource('files', 'FilesController');