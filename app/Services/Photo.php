<?php

namespace App\Services;

use App\Interfaces\IPhoto;
use Response;
use App\Models\Photo as PhotoModel;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Photo implements IPhoto
{
    /**
     * @var ImageManager
     */
    protected $imageManager;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->imageManager = new ImageManager(
            new \Intervention\Image\Drivers\Gd\Driver()
        );
    }

    /**
     * @inheritDoc
     */
    public function getPhotosForGrid() : array
    {
        $photos = PhotoModel::orderBy('row')
            ->orderBy('column')
            ->get();

        $photosArray = [];

        foreach ($photos as $photo) {
            if ($photo->thumbnail_path) {
                $path = storage_path('app/photos/' . $photo->thumbnail_path);

                if (file_exists($path)) {
                    try {
                        $sizeMeta = getimagesize($path);
                    } catch (Exception $e) {
                        Log::error($e->getMessage());
                    }
                }
            }

            $photosArray[] = [
                'id' => $photo->ulid,
                'column' => $photo->column,
                'row' => $photo->row,
                'image_path' => $photo->image_path,
                'thumbnail_path' => $photo->thumbnail_path,
                'width' => $sizeMeta[0] ?? 0,
                'height' => $sizeMeta[1] ?? 0,
                'name' => $photo->title ?? '',
                'description' => $photo->description ?? '',
                'tags' => $photo->tagIds()
            ];
        }

        return $photosArray;
    }

    /**
     * Resizes a photo twice.
     * Once for the thumbnail at 700 pixels high.
     * Once for carousel at 1080 pixels high.
     *
     * @param [type] $file
     * @return array|null
     */
    private function resizePhoto($file) : ? array
    {
        $ext = $file->getClientOriginalExtension();
        $fileName = Str::random(32) . '.' . $ext;
        $thumbnail = $fileName . '_thumbnail.' . $ext;
        $largeImage = $fileName . '_large.' . $ext;
        $allowed = [
            'png', 'jpg', 'jpeg', 'JPG', 'JPEG'
        ];

        if (!in_array($ext, $allowed)) {
            $error = 'Incorrect file type supplied';
            return null;
        }

        ini_set('memory_limit', '256M');

        try {
            if (!$file->storeAs('', $fileName, 'photos')) {
                return null;
            }

            $path = storage_path('app/photos/' . $fileName);
            $imageObject = $this->imageManager->read($path);

            $largeImagePath = storage_path('app/photos/' . $largeImage);

            $imageObject->scale(height : 1080)
                ->encodeByMediaType('image/jpeg', progressive : true, quality : 80)
                ->save($largeImagePath);

            $imageObject = $this->imageManager->read($path);
            $thumbnailPath = storage_path('app/photos/' . $thumbnail);

            $imageObject->scaleDown(height : 700)
                ->encodeByMediaType('image/jpeg', progressive : true, quality : 80)
                ->save($thumbnailPath);

            Storage::disk('photos')->delete($fileName);

            return [
                'image' => $largeImage,
                'thumbnail' => $thumbnail
            ];
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return null;
        }
    }

    /**
     * @inheritDoc
     */
    public function uploadPhotos(array $data, string &$error = '') : bool
    {
        if (empty($data['photos'])) {
            $error = 'Please select at least one photo';
            return false;
        }

        foreach ($data['photos'] as $key => $photo) {
            $fileNames = $this->resizePhoto($photo);

            if (!$fileNames) {
                $error = 'Failed to upload image and generate thumbnail';
                return false;
            }

            $model = new PhotoModel();
            $model->row = intval($data['row']);
            $model->image_path = $fileNames['image'];
            $model->thumbnail_path = $fileNames['thumbnail'];
            $model->column = intval($data['column']);
            $model->save();
        }

        return true;
    }

    /**
     * @inheritDoc
     */
    public function getPhoto(string $photoUlid, string &$error = '') : PhotoModel
    {
        $photo = PhotoModel::where('ulid', $photoUlid)
            ->first();

        if (null === $photo) {
            $error = 'Photo not found';
            return null;
        }

        $photo->title = $photo->title ?? '';
        $photo->description = $photo->description ?? '';
        $photo->tags = $photo->tags()->get() ?? [];

        return $photo;
    }

    /**
     * @inheritDoc
     */
    public function streamPhoto(string $photoImagePath)
    {
        $realBase = realpath(storage_path() . '/app/photos/');
        $realUserPath = realpath(storage_path() . '/app/photos/' . $photoImagePath);

        if (($realUserPath === false
            || strpos($realBase, $realUserPath) !== false)
            || !Storage::disk('photos')->exists($photoImagePath)) {
            abort(404);
        }

        $file = Storage::disk('photos')->get($photoImagePath);
        $type = Storage::disk('photos')->mimeType($photoImagePath);

        return Response::make($file, 200, ['Content-Type' => $type]);
    }

    /**
     * @inheritDoc
     */
    public function replacePhotoImage(array $data, string $photoUlid, string &$error = '') : bool
    {
        $photo = $this->getPhoto($photoUlid, $error);

        if (null === $photo) {
            $error = 'Existing image not found';
            return false;
        }

        if (!$data['photo']) {
            $error = 'Replacement file not found';
            return false;
        }

        if ($photo->image_path) {
            Storage::disk('photos')->delete($photo->image_path);
            $photo->image_path = null;
        }

        if ($photo->thumbnail_path) {
            Storage::disk('photos')->delete($photo->thumbnail_path);
            $photo->thumbnail_path = null;
        }

        $fileNames = $this->resizePhoto($data['photo']);

        if (!$fileNames) {
            $error = 'Failed to upload image and generate thumbnail';
            return false;
        }

        $photo->image_path = $fileNames['image'];
        $photo->thumbnail_path = $fileNames['thumbnail'];
        $photo->save();

        return true;
    }

    /**
     * @inheritDoc
     */
    public function destroyPhoto(string $photoUlid, string &$error) : bool
    {
        $photo = PhotoModel::where('ulid', $photoUlid)
            ->first();

        if (null === $photo) {
            $error = 'Image not found';
            return false;
        }

        $otherPhotosInRow = PhotoModel::where('row', $photo->row)
            ->where('column', '>', $photo->column)
            ->get();

        foreach ($otherPhotosInRow as $otherPhoto) {
            $otherPhoto->column = $otherPhoto->column - 1;
            $otherPhoto->save();
        }

        if ($photo->image_path) {
            Storage::disk('photos')->delete($photo->image_path);
        }

        if ($photo->thumbnail_path) {
            Storage::disk('photos')->delete($photo->thumbnail_path);
        }

        $photo->delete();

        return true;
    }

    /**
     * @inheritDoc
     */
    public function savePositions(array $data) : bool
    {
        if (empty($data['photos'])
            || empty($data['changes'])) {
            $error = 'No changes have been made';
            return false;
        }

        foreach ($data['photos'] as $key => $row) {
            foreach ($row as $photo) {
                $photo = is_object($photo) ? (array)$photo : $photo;

                $photoObject = PhotoModel::where('ulid', $photo['id'])
                    ->first();

                if (null !== $photoObject) {
                    $photoObject->row = $key;
                    $photoObject->column = $photo['column'];
                    $photoObject->save();
                }

            }
        }

        return true;
    }

    /**
     * {@inheritDoc}
     */
    public function updatePhotoDetails(string $uuid, array $data) : bool
    {
        $title = $data['title'] ?? null;
        $description = $data['description'] ?? null;
        $tags = $data['tags'] ?? null;
        $tagUlids = [];

        $photo = PhotoModel::where('ulid', $uuid)
            ->first();

        $photo->title = $title;
        $photo->description = $description;
        $photo->save();

        $photo->tags()->detach();

        if ($tags) {
            $photo->tags()->attach($tags);
        }

        return true;
    }
}