<?php

namespace App\Transformers;

use League\Fractal;
use App\User;

class UserTransformer extends Fractal\TransformerAbstract
{
    public function transform(User $user = null)
    {
        if (!$user) {
            return null;
        }

        return $user->toArray();
    }

}
