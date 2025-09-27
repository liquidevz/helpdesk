<?php namespace App\Http\Controllers;

use App\Services\HelpCenter\ExportHelpCenter;
use App\Services\HelpCenter\ImportHelpCenter;
use Common\Core\BaseController;

class HelpCenterActionsController extends BaseController
{
    public function __construct()
    {
        $this->middleware('isAdmin');
    }

    public function export()
    {
        $filename = (new ExportHelpCenter())->execute(
            request('format', 'json'),
        );

        return response(file_get_contents($filename), 200, [
            'Content-Type' => 'text/plain',
            'Content-Disposition' => 'attachment; filename="hc-export.zip',
        ]);
    }

    public function import()
    {
        $path = storage_path('app/hc-import.zip');
        (new ImportHelpCenter())->execute($path);
        return $this->success();
    }
}
