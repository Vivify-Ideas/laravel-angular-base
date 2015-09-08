<?php

namespace App\Exceptions;

use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Mail;
use Illuminate\Session\TokenMismatchException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        $code = $this->_getStatusCode($e);
        $errorLogEmails = config('app.error-log-emails');

        // email me about 500 errors on production and staging
        if (!config('app.debug') && $code == 500 && !empty($errorLogEmails)) {
            Mail::send('errors.email', array('exception' => $e), function($message) use ($code, $e, $errorLogEmails)
            {
                $message->to($errorLogEmails)
                    ->subject("$code Error - " . ucfirst(app()->environment()));
            });
        }

        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if($e instanceof TokenMismatchException) {
            return response([], 401);
        }

        $code = $this->_getStatusCode($e);

        if (!config('app.debug') && $code == 500) {
            return response()->view('errors.'.$code, [], $code);
        }

        return parent::render($request, $e);
    }

    protected function _getStatusCode($e)
    {
        return $e instanceof HttpException
            ? $e->getStatusCode()
            : 500;
    }
}
