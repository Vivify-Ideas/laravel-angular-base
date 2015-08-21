<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\UploadedFile;
use Auth;
use App\User;

class FilesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $type = $request->get('type');

        $file = UploadedFile::create(array('type' => $type));
        return UploadedFile::findOrFail($file->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(Request $request, $id)
    {
        
        $file = UploadedFile::findOrFail($id);

        if ($file->uploader_id !== Auth::user()->id) {
            App::abort(403);
        }

        $path = $request->has('orig') ? $file->getFullPathOriginal() : $file->getFullPath();

        header('Content-Type: '.$file->mimetype);
        header('Content-Disposition: inline; filename="'.$file->name.'"');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: '. filesize($path));
        header('Cache-Control: no-cache');

        readfile($path);
    }

    /**
     * Update resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $file = UploadedFile::findOrFail($id);

        if ($file->uploader_id != Auth::user()->id) {
            App::abort(403);
        }

        $file->resizeImage($request->get('selection'));

        return $file;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $file = UploadedFile::findOrFail($id);

        if ($file->uploader_id !== Auth::user()->id) {
            App::abort(403);
        }

        $file->delete();
        return response('');
    }

}
