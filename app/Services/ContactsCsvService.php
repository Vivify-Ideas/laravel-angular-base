<?php

namespace App\Services;

use App\UploadedFile;

class ContactsCsvService {

    public static function readImportFile(UploadedFile $file)
    {
        ini_set("auto_detect_line_endings", "1");
        $importData = array();

        if (($handle = fopen($file->getFullPath(), "r")) !== FALSE) {
            $emailIndex = -1;
            $fullNameIndex = -1;
            $firstNameIndex = -1;
            $lastNameIndex = -1;

            $counter = 0;
            $alreadyImportedEmails = array();
            while (($data = fgetcsv($handle, null, ",")) !== FALSE) {
                if ($counter == 0) {
                    if (!self::_determineIndexes($data, $emailIndex, $fullNameIndex, $firstNameIndex, $lastNameIndex)) {
                        return false;
                    }
                }

                if (isset($data[$emailIndex])
                    && filter_var($data[$emailIndex], FILTER_VALIDATE_EMAIL)
                    && !in_array($data[$emailIndex], $alreadyImportedEmails)) {

                    if ($fullNameIndex != -1 && isset($data[$fullNameIndex])) {
                        $name = $data[$fullNameIndex];
                    } else if ($firstNameIndex != -1 && isset($data[$firstNameIndex])) {
                        $name = $data[$firstNameIndex] . ($lastNameIndex != -1 && isset($data[$lastNameIndex]) ? ' ' . $data[$lastNameIndex] : '');
                    } else {
                        $name = '';
                    }

                    $importData[] = array(
                        'email' => $data[$emailIndex],
                        'name' => $name,
                        'first_name' => isset($data[$firstNameIndex]) ? $data[$firstNameIndex] : '',
                        'last_name' => isset($data[$lastNameIndex]) ? $data[$lastNameIndex] : '',
                        'import_file_id' => $file->id
                    );

                    $alreadyImportedEmails[] = $data[$emailIndex];
                }

                $counter++;
            }

            fclose($handle);
        }

        return $importData;
    }

    private static function _determineIndexes($data, &$emailIndex, &$fullNameIndex, &$firstNameIndex, &$lastNameIndex)
    {
        $num = count($data);
        for ($i=0; $i < $num; $i++) {
            if ($emailIndex == -1
                && (
                    filter_var($data[$i], FILTER_VALIDATE_EMAIL)
                    || stripos($data[$i], 'email') !== false
                    || stripos($data[$i], 'e-mail') !== false
                    || stripos($data[$i], 'e mail') !== false
                )
            ) {
                $emailIndex = $i;
            }

            if ($data[$i] == 'Name') {
                $fullNameIndex = $i;
            }

            if (strcasecmp($data[$i], 'first name') === 0) {
                $firstNameIndex = $i;
            }

            if (strcasecmp($data[$i], 'last name') === 0) {
                $lastNameIndex = $i;
            }
        }

        return $emailIndex !== -1;
    }
}
