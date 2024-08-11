<?php

namespace App\Services;

use App\Interfaces\ITag;
use App\Models\Tag as TagModel;
use Illuminate\Support\Collection;
use App\Models\Album as AlbumModel;


class Tag implements ITag
{
    /**
     * {@inheritDoc}
     */
    public function getTags() : Collection
    {
        $tags = TagModel::orderBy('title', 'asc')
            ->select('ulid', 'title');

        return $tags->get();
    }

    /**
     * Checks if a tag with the same title already exists
     *
     * @param string $title A string
     * @param string|null $ulid A ulid or null
     * @return boolean True if the tag exists or false if not
     */
    private function checkIfTagExists(string $title, ? string $ulid = null) : bool
    {
        $tag = TagModel::where('title', $title);

        if ($ulid) {
            $tag = $tag->where('ulid', '<>', $ulid);
        }

        return $tag->first() !== null;
    }

    /**
     * {@inheritDoc}
     */
    public function createTag(array $data, string &$error = '') : ? string
    {
        $title = $data['title'];

        if (empty($title)) {
            $error = 'No tag title defined';
            return null;
        }

        if ($this->checkIfTagExists($title)) {
            $error = 'Tag already exists';
            return null;
        }

        $tagModel = new TagModel();
        $tagModel->title = $title;
        $tagModel->save();

        return $tagModel->ulid;
    }

    /**
     * {@inheritDoc}
     */
    public function updateTag(string $ulid, array $data, string &$error = '') : bool
    {
        $title = $data['title'];

        if (empty($title)) {
            $error = 'No tag title defined';
            return false;
        }

        $tagModel = TagModel::where('ulid', $ulid)
            ->first();

        if ($this->checkIfTagExists($title, $ulid)) {
            $error = 'Tag already exists';
            return false;
        }

        $tagModel->title = $title;
        return $tagModel->save();
    }

    /**
     * {@inheritDoc}
     */
    public function deleteTag(string $ulid) : bool
    {
        $tag = TagModel::where('ulid', $ulid)
            ->first();

        if (!$tag) {
            return false;
        }

        $tag->photos()->detach();

        return TagModel::where('ulid', $ulid)
            ->delete();
    }
}