<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Mail;
use Carbon\Carbon;

class ErrorLogController extends Controller
{
    protected $throttlingSessionKey = 'lastErrorTimestamp';
    protected $throttlingRestore = 60;

    public function log(Request $request)
    {
        if ($this->shouldSendEmail()) {
            $this->resetThrottling();
            $this->sendErrorEmail($request);
        }

        return response('');
    }

    protected function shouldSendEmail()
    {
        return !config('app.debug') && !empty(config('app.error-log-emails')) && $this->checkThrottling();
    }

    /**
     * Only one error per $this->throttlingRestore seconds can be sent from a user
     *
     * @return bool
     */
    protected function checkThrottling()
    {
        $currentTimestamp = Carbon::now()->getTimestamp();
        $lastErrorTimestamp = session($this->throttlingSessionKey);

        return !$lastErrorTimestamp || $currentTimestamp - $lastErrorTimestamp > $this->throttlingRestore;
    }

    protected function resetThrottling()
    {
        return session([$this->throttlingSessionKey => Carbon::now()->getTimestamp()]);
    }

    protected function sendErrorEmail($request)
    {
        $data = $request->all();

        Mail::send('errors.email-javascript', $data, function($message)
        {
            $message->to(config('app.error-log-emails'))
                ->subject("Javascript Error - " . ucfirst(app()->environment()));
        });
    }

}
