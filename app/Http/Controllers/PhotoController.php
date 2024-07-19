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
    public function index(Request $request) : JsonResponse
    {
        $photos = $this->_photoService->getPhotosForGrid();
        return response()->json($photos, 200);
    }

    public function store(Request $request) : JsonResponse
    {
        $error = '';

        $created = $this->_photoService->uploadPhotos(
            [
                'photos' => $request->file('photos'),
                'row' => $request->input('row'),
                'column' => $request->input('column'),
            ],
            $error
        );

        if (!$created) {
            return response()->json($error, 500);
        }

        return response()->json('Image Created', 201);
    }

    /**
     *
     * Return a cover image
     * @param $image
     * @return mixed
     */
    public function show($path)
    {
        return $this->_photoService->streamPhoto($path);
    }

    /**
     * 
     * Update photo positions
     * @param Request $request
     * @return JsonResponse
     */
    public function savePhotoPositions(Request $request) : JsonResponse
    {
        $updated = $this->_photoService->savePositions(
            [
                'photos' => json_decode($request->input('photos')),
                'changes' => $request->input('changes')
            ]
        );

        if (!$updated) {
            return response()->json('No changes were saved', 400);
        }

        return response()->json('Your changes have been saved!', 200);
    }

    /**
     * Replaced a photo
     *
     * @param Request $request
     * @param string $ulid
     * @return JsonResponse
     */
    public function update(Request $request, string $ulid) : JsonResponse
    {
        $error = '';
        $replaced = $this->_photoService->replacePhotoImage(
            [
                'photo' => $request->file('photo')
            ],
            $ulid,
            $error
        );

        if (!$replaced) {
            return response()->json($error, 400);
        }

        return response()->json('The photo was replaced!', 200);
    }

    /**
     * Drstroy photos
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function destroy(Request $request): JsonResponse
    {
        $error = '';
        $photoUlids = json_decode($request->input('ids'));

        foreach ($photoUlids as $photoUlid) {
            $deleted = $this->_photoService->destroyPhoto($photoUlid, $error);

            if (!$deleted) {
                return response()->json($error, 400);
            }
        }

        return response()->json('The photos were displayed!', 200);
    }
}
