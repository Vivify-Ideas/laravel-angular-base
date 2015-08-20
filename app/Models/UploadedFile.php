<?php

namespace App;

use Intervention\Image\Facades\Image;

class UploadedFile extends BaseModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'files';

    /**
     * The attributes that arn't mass assignable.
     *
     * @var array
     */
    protected $guarded = array('id');

    protected $appends = array('extension', 'url', 'url_original');

    protected $casts = [
        'size' => 'array',
        'origin_size' => 'array',
        'selection' => 'array'
    ];

    protected $transformerClass = 'App\Transformers\FileTransformer';

    protected function _getFolder()
    {
        return '/app/uploads/'.$this->type;
    }

    public function getFullPath()
    {
        return storage_path() . $this->_getFolder() . '/' . $this->filename;
    }

    public function getFullPathOriginal()
    {
        return storage_path() . $this->_getFolder() . '/original_' . $this->filename;
    }

    public function getFullPathToFolder()
    {
        return storage_path() . $this->_getFolder();
    }

    public function duplicate($type = null)
    {
        return self::create([
            'name' => $this->name,
            'type' => $type ? $type : $this->type,
            'path' => $this->getFullPath()
        ]);
    }

    public function getExtensionAttribute($value)
    {
        $lastDotPos = strrpos($this->filename, '.');
        if (!$lastDotPos) {
            return false;
        }

        return strtolower(substr($this->filename, $lastDotPos + 1));
    }

    public function isCSV()
    {
        return $this->mimetype == 'text/csv' || $this->extension == 'csv';
    }

    public function getUrlAttribute($value)
    {
        return sprintf('/files/%s', $this->id);
    }

    public function getUrlOriginalAttribute($value)
    {
        return sprintf('/files/%s?orig=1', $this->id);
    }

    public function resizeImage($selection)
    {
        $this->selection = $selection;

        $image = Image::make($this->getFullPathOriginal());

        if (is_array($this->selection)) {
            if (empty($this->selection['w']) || empty($this->selection['h'])) {
                return false;
            }

            $image->crop(
                intval($this->selection['w']),
                intval($this->selection['h']),
                intval($this->selection['x']),
                intval($this->selection['y'])
            );

            $image->save($this->getFullPath(), 80);
        }

        $this->save();

        return $this;
    }

}
