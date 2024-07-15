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
     * Upload a new photo
     *
     * @param array $data
     *  - ['photos', 'row', 'slug]
     * @param string $error
     * @return boolean
     */
    public function uploadPhotos(array $data, string &$error = ''): bool;

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
     * @param array $data
     * @param string $photoUlid
     * @param string $error
     * @return boolean
     */
    public function replacePhotoImage(array $data, string $photoUlid, string &$error = ''): bool;

    /**
     * Destroys a photo
     *
     * @param string $photoUlid
     * @param string $error
     * @return boolean
     */
    public function destroyPhoto(string $photoUlid, string &$error): bool;

    /**
     * Mass updates photo rows and columns for the grid
     *
     * @param array $data
     * @return boolean
     */
    public function savePositions(array $data) : bool;
}