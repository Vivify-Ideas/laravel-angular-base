<?php

namespace App\Transformers;

use League\Fractal;
use App\UploadedFile;

class FileTransformer extends Fractal\TransformerAbstract
{
    protected $availableIncludes = [
    ];

    protected $defaultIncludes = [
    ];

    public function transform(UploadedFile $file = null)
    {
        if (!$file) {
            return null;
        }

        return $file->toArray();
    }

}