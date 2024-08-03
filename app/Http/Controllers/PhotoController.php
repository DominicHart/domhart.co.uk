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
    protected $photoService;

    public function __construct(Photo $photoService)
    {
        $this->photoService = $photoService;
    }

    /**
     * Returns all of the photos in a structured manner
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request) : JsonResponse
    {
        $photos = $this->photoService->getPhotosForGrid();
        return response()->json($photos, 200);
    }

    public function store(Request $request) : JsonResponse
    {
        $error = '';

        $created = $this->photoService->uploadPhotos(
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
    public function show(string $path)
    {
        return $this->photoService->streamPhoto($path);
    }

    /**
     * Returns a photo for editing
     *
     * @param string $ulid
     * @return JsonResponse
     */
    public function edit(string $ulid): JsonResponse
    {
        $photo = $this->photoService->getPhoto($ulid);

        if (!$photo) {
            return response()->json('No photo found', 404);
        }

        return response()->json($photo, 200);

    }

    /**
     * 
     * Update photo positions
     * @param Request $request
     * @return JsonResponse
     */
    public function savePhotoPositions(Request $request) : JsonResponse
    {
        $updated = $this->photoService->savePositions(
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
     * Update photo details
     *
     * @param Request $request
     * @param string $ulid
     * @return JsonResponse
     */
    public function update(Request $request, string $ulid) : JsonResponse
    {
        $updated = $this->photoService->updatePhotoDetails($ulid, (array) json_decode($request->input('photo')));

        if (!$updated) {
            return response()->json('Photo details were not updated', 400);
        }

        return response()->json('Your changes have been saved!', 200);
    }

    /**
     * Replace a photo
     *
     * @param Request $request
     * @param string $ulid
     * @return JsonResponse
     */
    public function replacePhoto(Request $request, string $ulid) : JsonResponse
    {
        $error = '';
        $replaced = $this->photoService->replacePhotoImage(
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
            $deleted = $this->photoService->destroyPhoto($photoUlid, $error);

            if (!$deleted) {
                return response()->json($error, 400);
            }
        }

        return response()->json('The photos were deleted!', 200);
    }
}
