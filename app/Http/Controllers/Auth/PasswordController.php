<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Password;
use Illuminate\Mail\Message;
use App\PasswordReset;
use Auth;

class PasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */


    /**
     * Create a new password controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function postEmail(Request $request)
    {
        $this->validate($request, ['email' => 'required|email']);

        $response = Password::sendResetLink($request->only('email'), function (Message $message) {
            $message->subject($this->getEmailSubject());
        });

        switch ($response) {
            case Password::RESET_LINK_SENT:
                return response(['status' => trans($response)]);

            case Password::INVALID_USER:
                return response(['email' => [trans($response)]], 422);
        }
    }

    public function postReset(Request $request)
    {
        $this->validate($request, [
            'token' => 'required|exists:password_resets,token',
            'password' => 'required|confirmed|min:6',
        ]);

        $credentials = $request->only(
            'password', 'password_confirmation', 'token'
        );

        $passwordReset = PasswordReset::where('token', '=', $credentials['token'])->first();
        $credentials['email'] = $passwordReset->email;

        $response = Password::reset($credentials, function ($user, $password) {
            $this->resetPassword($user, $password);
        });

        switch ($response) {
            case Password::PASSWORD_RESET:
                return Auth::user();

            default:
                return response(['status' => 'failed'], 422);
        }
    }

    protected function getEmailSubject()
    {
        return isset($this->subject) ? $this->subject : 'Your Password Reset Link';
    }

    protected function resetPassword($user, $password)
    {
        $user->password = bcrypt($password);

        $user->save();

        Auth::login($user);
    }

}
