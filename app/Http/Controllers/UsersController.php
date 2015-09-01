<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Exception\HttpResponseException;
use Illuminate\Support\Facades\Lang;

class UsersController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($user->id != Auth::user()->id) {
            abort(403);
        }

        switch ($request->get('action')) {
            case 'basic_info' : 
                $input = $this->_validateBasicInfo($request, $user);
                break;
            default : 
                $input = $this->_validatePhoto($request, $user);
                break;
        }

        $user->update($input);

        return $user;
    }

    public function changePassword(Request $request, $id) 
    {   
        $this->validate($request, [
            'new' => 'required|confirmed|min:8'
        ],
        [
            'new.required' => 'New Password is required',
            'new.password' => Lang::get('validation.custom.password.password'),
        ]);

        $user = User::findOrFail($id);

        if ($user->id != Auth::user()->id) {
            abort(403);
        }

        if (!Hash::check($request->get('current'), $user->password)) {
            return response(['current' => ['Incorrect current password']], 422);
        }

        $user->password = Hash::make($request->get('new'));
        $user->save();

        return response('', 204);
    }

    protected function _validateBasicInfo(Request $request, User $user)
    {
        $rules = [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
        ];

        $this->validate($request, $rules);

        return $request->only(array_keys($rules));
    }

    protected function _validatePhoto(Request $request, User $user)
    {
        $rules = [
            'photo_id' => 'exists:files,id'
        ];

        $this->validate($request, $rules);

        return $request->only(array_keys($rules));
    }

}
