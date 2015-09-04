<?php

namespace App\Transformers;

use League\Fractal;

class CardTransformer extends Fractal\TransformerAbstract
{
    protected $availableIncludes = [
    ];

    protected $defaultIncludes = [
    ];

    public function transform($card = null)
    {
        if (!$card) {
            return null;
        }

        return [
            'id' => $card->id,
            'last_four' => $card->last4,
            'type' => $card->brand,
            'expiration' => $card->exp_month . '/' . $card->exp_year,
            'user_id' => $card->user_id
        ];
    }

}