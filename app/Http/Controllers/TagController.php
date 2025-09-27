<?php namespace App\Http\Controllers;

use App\Data\LoadStatusAndCategoryTags;
use Common\Tags\TagController as CommonTagController;

class TagController extends CommonTagController
{
    public function tagsForAgentMailbox()
    {
        return $this->success((new LoadStatusAndCategoryTags())->execute());
    }
}
