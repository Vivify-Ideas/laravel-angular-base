<?php

namespace App\Http\Controllers\Billing;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use PDF;
use App;
use App\Transformers\InvoiceTransformer;
use App\Transformers\TransformerManager;

class UserInvoicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($userId)
    {
        if (Auth::user()->id != $userId) {
            abort(403);
        }

        return Auth::user()->getInvoices();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($userId, $id)
    {
        if (Auth::user()->id != $userId) {
            abort(403);
        }

        $user = Auth::user();
        $invoice = $user->findInvoiceOrFail($id);

        $pdf = App::make('dompdf.wrapper');
        $pdf->loadHTML($invoice->render([
            'user' => $user,
            'card' => $user->getCard(),
            'vendor' => $user->last_name,
            'invoiceTransformed' => TransformerManager::transformDataToArray(
                new InvoiceTransformer($user),
                $invoice,
                'Item'
            )
        ]));

        return $pdf->stream();
    }

}
