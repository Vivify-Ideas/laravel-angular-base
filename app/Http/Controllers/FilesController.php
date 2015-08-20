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

        header('Content-Type: '.$file->mimetype);
        header('Content-Disposition: inline; filename="'.$file->name.'"');

        $path = $request->has('orig') ? $file->getFullPathOriginal() : $file->getFullPath();

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
    
    public function showUserLogo($id)
    {
        $user = User::find($id);

        if (!$user) {
            abort(404);
        }

        $logo = $user->logo;

        if($logo) {
            $path = $logo->getFullPath();
            $mimetype = $logo->mimetype;
            $filename = $logo->name;
        } else {
            $mimetype = 'image/jpeg';
            $filename = 'logo.jpg';
            $path = sprintf('%s/images/logo-default.jpg', public_path());
        }

        header('Content-Type: '.$mimetype);
        header('Content-Disposition: inline; filename="'.$filename.'"');

        readfile($path);
    }

}
