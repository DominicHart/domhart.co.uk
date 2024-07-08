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
    public function __construct() {
        $this->imageManager = new ImageManager(
            new \Intervention\Image\Drivers\Gd\Driver()
        );
    }
    
    /**
     * @inheritDoc
     */
    public function getPhotosForGrid(): array
    {
        $photos = PhotoModel::all();
        $photoRows = [];

        foreach ($photos as $photo) {
            $count++;
            $key = intval($photo->row);

            if ($photo->thumbnail_path) {
                $path = storage_path('app/photos/' . $photo->thumbnail_path);

                try {
                    $sizeMeta = getimagesize($path);
                } catch (Exception $e) {
                    Log::error($e->getMessage());
                }
            }

            $photoRows[$key][] = [
                'ulid' => $photo->ulid,
                'column' => $photo->column,
                'image_path' => $photo->image_path,
                'thumbnail_path' => $photo->thumbnail_path,
                'carousel_key' => $count,
                'width' =>  $sizeMeta[0] ?? 0,
                'height' => $sizeMeta[1] ?? 0
            ];
        }

        return $photoRows;
    }

    /**
     * Resizes a photo twice.
     * Once for the thumbnail at 700 pixels high.
     * Once for carousel at 1080 pixels high.
     *
     * @param [type] $file
     * @return array|null
     */
    private function resizePhoto($file): ?array
    {
        $ext = $file->getClientOriginalExtension();
        $fileName = Str::random(32) . '.' .  $ext;
        $thumbnail = $fileName . '_thumbnail.' . $ext;
        $allowed = [
            'png', 'jpg', 'jpeg', 'JPG', 'JPEG'
        ];
        
        if (!in_array($ext, $allowed)) {
            $error = 'Incorrect file type supplied';
            return null;
        }

        ini_set('memory_limit','256M');

        try {
            if (!$file->storeAs('', $fileName, 'photos')) {
                return null;
            }
            
            $path = storage_path('app/photos/' . $fileName);
            $imageObject = $this->imageManager->read($path);
      
            $imageObject->scale(height: 1080)
                ->encodeByMediaType('image/jpeg', progressive: true, quality: 80)
                ->save($path);

            $imageObject = $this->imageManager->read($path);
            $thumbnailPath = storage_path('app/photos/' . $thumbnail);

            $imageObject->scaleDown(height: 700)
                ->encodeByMediaType('image/jpeg', progressive: true, quality: 80)
                ->save($thumbnailPath);

            return [
                'image' => $fileName,
                'thumbnail' => $thumbnail
            ];
        } catch(\Exception $e) {
            Log::error($e->getMessage());
            return null;
        }
    }

    /**
     * @inheritDoc
     */
    public function createPhotos(array $data, string &$error = ''): bool
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
    public function getPhoto(string $photoUlid, string &$error = ''): PhotoModel
    {
        $photo = PhotoModel::findByUuid($photoUlid);

        if (null === $photo) {
            $error = 'Photo not found';
            return null;
        }

        return $photo;
    }

    /**
     * @inheritDoc
     */
    public function streamPhoto(string $photoImagePath)
    {
        $realBase = realpath(storage_path() . '/app/photos/');
        $realUserPath = realpath(storage_path() . '/app/photos/' . $photoImagePath);

        if (
            (
                $realUserPath === false
                || strpos($realBase, $realUserPath) !== false
            )
            || !Storage::disk('photos')->exists($photoImagePath)
        ) {
            abort(404);
        }

        $file = Storage::disk('photos')->get($photoImagePath);
        $type = Storage::disk('photos')->mimeType($photoImagePath);
        
        return Response::make($file, 200, ['Content-Type' => $type]);
    }

    /**
     * @inheritDoc
     */
    public function replacePhotoImage(Request $request, string $photoUlid, string &$error = ''): bool
    {
        $photo = $this->getPhoto($photoUlid, $error);

        if (null === $photo) {
            $error = 'Existing image not found';
            return false;
        }

        if (!$request->file('image')) {
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
    
        $fileNames = $this->uploadImage($request->file('image'));

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
    public function destroyPhoto(string $photoUlid, string &$error): bool
    {
        $photo = PhotoModel::findByUuid($photoUlid);

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
}