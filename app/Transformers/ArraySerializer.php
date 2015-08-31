<?php

namespace App\Transformers;

use League\Fractal\Serializer\ArraySerializer as FractalArraySerializer;

class ArraySerializer extends FractalArraySerializer
{

    public function collection($resourceKey, array $data)
    {
        return $resourceKey ?: $data;
    }

}