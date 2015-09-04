<?php

namespace App\Http\Controllers\Billing;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;

class UserCardsController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($userId)
    {
        if (Auth::user()->id != $userId) {
            abort(403);
        }

        return Auth::user()->getCard();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $userId, $id)
    {
        if (Auth::user()->id != $userId) {
            abort(403);
        }

        return Auth::user()->updateCard($request->get('token'));
    }

}
