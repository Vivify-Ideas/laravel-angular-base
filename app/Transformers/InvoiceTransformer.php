<?php

namespace App\Transformers;

use League\Fractal;
use App\Plan;

class InvoiceTransformer extends Fractal\TransformerAbstract
{
    protected $availableIncludes = [
    ];

    protected $defaultIncludes = [
    ];

    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function transform($invoice = null)
    {
        if (!$invoice) {
            return null;
        }

        $ret = [
            'id' => $invoice->id,
            'amount' => $invoice->total / 100,
            'created_at' => date('Y-m-d H:i:s', $invoice->date),
            'start_at' => date('Y-m-d H:i:s', $invoice->period_start),
            'end_at' => date('Y-m-d H:i:s', $invoice->period_end),
            'url' => action('Billing\UserInvoicesController@show', [
                'user_id' => $this->user->id,
                'id' => $invoice->id
            ]),
            'user_id' => $this->user->id,
            'lines' => []
        ];

        $descriptions = [];
        foreach ($invoice->lines->data as $line) {

            if ($line->type == 'subscription') {
                $description = 'Subscription to ' . $line->plan->name;

                $ret['start_at'] = date('Y-m-d H:i:s', $line->period->start);
                $ret['end_at'] = date('Y-m-d H:i:s', $line->period->end);
                $plan = $line->plan;
            } else {
                $description = $line->description;
                $plan = null;
            }

            $descriptions[] = $description;
            $ret['lines'][] = [
                'amount' => number_format($line->amount/100, 2),
                'description' => $description
            ];
        }

        $ret['description'] = implode(', ', $descriptions);

        return $ret;
    }

}