<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use App\UploadedFile;
use App;
use App\Services\ContactsCsvService;

class ContactsController extends Controller
{

    /**
     * Parse contacts from csv file
     *
     */
    public function parseFromCsv(Request $request)
    {
        $file = UploadedFile::findOrFail($request->get('file_id'));

        if ($file->uploader_id != Auth::user()->id) {
            abort(403);
        }

        if (!$file->isCSV()) {
            abort(400);
        }

        return ContactsCsvService::readImportFile($file);
    }

}
