<?php

namespace App\Listeners\Models;

use Illuminate\Http\Request;

use App\UploadedFile;
use Illuminate\Support\Facades\File;
use Auth;

class UploadedFileObserver
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Triggered when new file is added to the DB
     *
     * @param UploadedFile $model
     */
    public function creating(UploadedFile $model)
    {
        $file = $this->request->file('file');

        if ($model->path) {
            $this->_saveFileFromExistingPath($model);
        } elseif ($file) {
            $this->_saveFileToFilesystem($model, $file);
        }

        return $model;
    }

    protected function _saveFileFromExistingPath($model)
    {
        $fileParts = explode('.', $model->path);
        $ext = end($fileParts);

        $destinationPath = $model->getFullPathToFolder();
        $filename = str_random(16) . (strlen($ext) > 5 ? '' : '.' . $ext);
        $filePath = $destinationPath . '/' . $filename;

        @file_put_contents($filePath, @file_get_contents($model->path));

        if (file_exists($filePath)) {
            $file = new \Symfony\Component\HttpFoundation\File\File($filePath);

            $model->mimetype = $file->getMimeType();
            $model->filename = $filename;
        }

        unset($model->path);

        $this->_saveModel($model, $filename);
    }

    protected function _saveFileToFilesystem($model, $file)
    {
        $destinationPath = $model->getFullPathToFolder();
        $filename = str_random(16) . '.' . $file->getClientOriginalExtension();

        if ($file->move($destinationPath, $filename)) {
            $model->name = $file->getClientOriginalName();
            $model->mimetype = $file->getClientMimeType();
            $model->filename = $filename;
        }

        $this->_saveModel($model, $filename);
    }

    protected function _saveModel($model, $filename)
    {
        $fullDestinationPath = $model->getFullPathToFolder();

        $imageSize = @getimagesize($fullDestinationPath . '/' . $filename);

        if (is_array($imageSize)) {
            File::copy(
                $fullDestinationPath . '/' . $filename,
                $fullDestinationPath . '/original_' . $filename
            );

            $size = array(
                'width' => $imageSize[0],
                'height'=> $imageSize[1]
            );

            $model->size = $size;
            $model->origin_size = $size;
        }

        $model->uploader_id = Auth::user()->id;
    }

    /**
     * Trigger when file is deleted from DB
     *
     * @param UploadedFile $model
     */
    public function deleted(UploadedFile $model)
    {
        @unlink($model->getFullPath());
    }
}