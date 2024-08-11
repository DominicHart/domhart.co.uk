<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Tag as TagService;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    protected $tagService;

    /**
     * Injects tag service
     *
     * @param TagService $tagService
     */
    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    /**
     * Tags
     * 
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $tags = $this->tagService->getTags();
        return response()->json($tags, 200);
    }

    /**
     * Create a new tag
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $error = '';
        $data = [
            'title' => $request->input('title')
        ];

        $tagUuid = $this->tagService->createTag($data, $error);

        if (null === $tagUuid) {
            return response()->json($error, 500);
        }

        return response()->json($tagUuid, 201);
    }

    /**
     * Update a tag
     * 
     * @param Request $request
     * @param $uuid
     * @return JsonResponse
     */
    public function update(Request $request, $uuid): JsonResponse
    {
        $error = '';
        $data = [
            'title' => $request->input('title')
        ];
        $updated = $this->tagService->updateTag($uuid, $data, $error);
       
        if (!$updated) {
            return response()->json($error, 500);
        }

        return response()->json('Tag Updated!', 200);
    }

    /**
     * Destroy a Tag
     *
     * @param string $uuid
     * @return JsonResponse
     */
    public function destroy(string $uuid): JsonResponse
    {
        $destroyed = $this->tagService->deleteTag($uuid);

        if (!$destroyed) {
            return response()->json('An error occurred while deleting the tag', 500); 
        }

        return response()->json(204); 
    }
}

