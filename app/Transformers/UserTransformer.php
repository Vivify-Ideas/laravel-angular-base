<?php

namespace App\Transformers;

use League\Fractal;
use App\User;

class UserTransformer extends Fractal\TransformerAbstract
{

    protected $defaultIncludes = [
        'photo'
    ];

    public function transform(User $user = null)
    {
        if (!$user) {
            return null;
        }

        return $user->toArray();
    }

    public function includePhoto($user)
    {
        $photo = $user->photo;

        if(!$photo) {
            return null;
        }

        return $this->item(
            $photo,
            new FileTransformer
        );
    }

}
