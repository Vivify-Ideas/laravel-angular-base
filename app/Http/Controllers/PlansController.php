<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Plan;
use App;

class PlansController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Plan::all();
    }

    public function show($id)
    {
        $plan = Plan::getByKey($id);

        if(!$plan) {
            App::abort(404);
        }

        return $plan;
    }

}
