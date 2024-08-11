<?php

namespace App\Interfaces;
use Illuminate\Support\Collection;

interface ITag
{
    /**
     * Returns all tags
     *
     * @return Collection An associative array of tags where keys are uuids and values titles
     */
    public function getTags(): Collection;

    /**
     * Creates a new tag
     *
     * @param array $data An associative array:
     *  [
     *      'title' => string A title
     *  ]
     * @param string $error An empty string to receive an error message
     * @return string|null The ulid of the newly created tag model or null
     */
    public function createTag(array $data, string &$error = ''): ?string;

    /**
     * Updates a tag
     *
     * @param string $ulid A ulid string
     * @param array $data An associative array:
     *  [
     *      'title' => string A title
     *  ]
     * @param string $error An empty string to receive an error message
     * @return boolean True if the tag was updated or false
     */
    public function updateTag(string $ulid, array $data, string &$error = ''): bool;

    /**
     * Destroys a tag
     *
     * @param string $ulid A ulid string
     * @return boolean
     */
    public function deleteTag(string $ulid): bool;
}