<?php

namespace App;

use App\Transformers\TransformerManager;

trait TransformerTrait {

    protected $toArrayTransformingInProcess = false;

    public function getTransformer()
    {
        return $this->transformerClass;
    }

    public function toJson($options = 0)
    {
        $transformer = $this->getTransformer();

        if ($transformer) {
            return TransformerManager::transformDataToJson(new $transformer(), $this);
        }

        return parent::toJson($options);
    }

    public function toArray()
    {
        $transformer = $this->getTransformer();

        if ($transformer && !$this->toArrayTransformingInProcess) {
            // this is needed to avoid infinitive loop (Fractal League is also calling toArray)
            $this->toArrayTransformingInProcess = true;
            return TransformerManager::transformDataToArray(new $transformer(), $this);
        }

        return parent::toArray();
    }

}
