<?php

namespace App\Transformers;

use League\Fractal;
use League\Fractal\Resource\Item;
use League\Fractal\Resource\Collection;

class TransformerManager {

    public static function transformDataToArray(Fractal\TransformerAbstract $transformer, $data, $type = null)
    {
        $fractal = new Fractal\Manager();
        $fractal->setSerializer(new ArraySerializer());

        if (isset($_GET['include'])) {
            $fractal->parseIncludes($_GET['include']);
        }

        if (is_subclass_of($data, 'Illuminate\Database\Eloquent\Model') || $type=='Item') {
            // item transform
            $data = new Item($data, $transformer);
        } else {
            // collection transform
            $data = new Collection($data, $transformer);
        }

        return $fractal->createData($data)->toArray();
    }

    public static function transformDataToJson(Fractal\TransformerAbstract $transformer, $data, $type = null)
    {
        return json_encode(self::transformDataToArray($transformer, $data, $type), JSON_NUMERIC_CHECK);
    }

}
