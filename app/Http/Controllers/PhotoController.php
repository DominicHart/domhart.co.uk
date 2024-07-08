<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Photo;
use Illuminate\Http\JsonResponse;

class PhotoController extends Controller
{
    /**
     * @var Photo
     */
    protected $_photoService;

    public function __construct(Photo $photoService)
    {
        $this->_photoService = $photoService;
    }

    /**
     * Returns all of the photos in a structured manner
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $photos = $this->_photoService->getPhotosForGrid();
        return response()->json($photos, 200);
    }
}
