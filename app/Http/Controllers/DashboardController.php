<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use App\Jobs\AmazonSync;

class DashboardController extends Controller
{

    public function testAngular()
    {
        return \Response::json('Angular');
    }

}