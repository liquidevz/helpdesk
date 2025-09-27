<?php namespace App\Http\Controllers;

use App\Data\LandingPageLoader;
use Common\Core\BaseController;

class LandingPageController extends BaseController
{
    public function __invoke()
    {
        $data = (new LandingPageLoader())->loadData();

        return $this->renderClientOrApi([
            'data' => $data,
            'pageName' => 'landing-page',
        ]);
    }
}
