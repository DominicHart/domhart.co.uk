<?php

namespace App\Interfaces;
use App\Models\Photo as PhotoModel;
use Illuminate\Http\Request;

interface IPhoto
{
    /**
     * Retrieves photos and structures them into rows for the grid
     *
     * @return array
     */
    public function getPhotosForGrid(): array;

    /**
     * Create a new image including file upload
     *
     * @param array $data
     *  - ['photos', 'row', 'slug]
     * @param string $error
     * @return boolean
     */
    public function createPhotos(array $data, string &$error = ''): bool;

    /**
     * Returns a photo object
     *
     * @param string $photoUlid
     * @param string $error
     * @return PhotoModel
     */
    public function getPhoto(string $photoUlid, string &$error = ''): PhotoModel;

    /**
     * Returns a photo for streaming
     *
     * @param string $photoImagePath
     * @return mixed
     */
    public function streamPhoto(string $photoImagePath);

    /**
     * Replaces a photo file
     *
     * @param Request $request
     * @param string $photoUlid
     * @param string $error
     * @return boolean
     */
    public function replacePhotoImage(Request $request, string $photoUlid, string &$error = ''): bool;

    /**
     * Destroys a photo
     *
     * @param string $photoUlid
     * @param string $error
     * @return boolean
     */
    public function destroyPhoto(string $photoUlid, string &$error): bool;
}