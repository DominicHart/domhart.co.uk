import React, { useEffect, useState } from 'react';
import { Tag } from '../types/tag';
import { getTags, addTag, destroyTag, updateTag } from '../api/Tag';
import Swal from "sweetalert2";

type Props = {
  selectedTags: Array<String>,
  updateSelectedTags: (selectedTags: Array<String>) => void;
  photoUuid: string | null;
}

const ImageTags: React.FC<Props> = ({ selectedTags, updateSelectedTags, photoUuid }) => {
  const [tagTitle, setTagTitle] = useState<string>(''),
    [tags, setTags] = useState<Tag[] | null>(null),
    [editId, setEditId] = useState<string | null>(null);

  const fetchTags = async () => {
    const tagsData = await getTags();
    setTags(tagsData);
  }

  const addNewTag = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!tagTitle) {
      return false;
    }
    const tagAdded = await addTag(tagTitle);
    if (tagAdded) {
      fetchTags();
      setTagTitle('');
    } else {
      console.log('Something went wrong');
    }
  };

  const changeTagSelection = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const tagUuid: string = e.currentTarget.value;

    if (!tagUuid) {
      return;
    }

    let selectedTagsCopy = [...selectedTags];

    if (selectedTagsCopy.includes(tagUuid)) {
      selectedTagsCopy = selectedTagsCopy.filter(i => i !== tagUuid);
    } else {
      selectedTagsCopy.push(tagUuid);
    }

    updateSelectedTags(selectedTagsCopy);
  };

  const editTag = (tag: Tag) => {
    setEditId(tag.ulid);
    setTagTitle(tag.title);
  }

  const updateExistingTag = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!tagTitle || !editId) {
      return false;
    }
    const tagAdded = await updateTag(editId, tagTitle);
    if (tagAdded) {
      fetchTags();
      setEditId(null);
      setTagTitle('');
    } else {
      console.log('Something went wrong');
    }
  };

  const deleteTag = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let ulid = e.currentTarget.dataset.ulid;
    if (!ulid) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this Image!",
      icon: "warning",
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        destroyTag(ulid)
          .then(res => {
            fetchTags();
          }).catch(function (err) {
            console.log('Something went wrong while deleting the image!')
          });
      }
    });
  }

  useEffect(() => {
    if (photoUuid) {
      fetchTags();
    }
  }, [photoUuid]);

  return (
    <div className="bg-gray-100 p-2 mt-2">
      <ul>
        {tags !== null && tags.map((tag: Tag, i) =>
          <li className="block w-full bg-white p-1" key={`tag-item-${i}`}>
            <input type="checkbox" checked={selectedTags.includes(tag.ulid)} value={tag.ulid} onChange={changeTagSelection} />
            <span className="ml-2">
              {tag.title}
              <button
                type="button"
                className="ml-2 text-blue-500"
                data-ulid={tag.ulid}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); editTag(tag); }}
              >
                Edit
              </button>
              <button
                type="button"
                className="ml-2 text-blue-500 text-lg font-bold"
                data-ulid={tag.ulid}
                onClick={deleteTag}
              >
                &times;
              </button>
            </span>
          </li>
        )}
        <li className="block w-full mt-2">
          <input type="text" className="p-1" placeholder="Add a new tag" value={tagTitle} onChange={(e: React.KeyboardEvent<HTMLInputElement>) => { setTagTitle(e.currentTarget.value) }} />
          {!editId ? (
            <button type="button" className="bg-gray-900 text-white font-semibold px-3 py-1 ml-2" onClick={addNewTag}>Add Tag</button>
          ) : (
            <div className="inline-block">
              <button type="button" className="bg-gray-900 text-white font-semibold px-3 py-1 ml-2" onClick={updateExistingTag}>Update Tag</button>
              <button type="button" className="bg-gray-300 font-semibold px-3 py-1 ml-2" onClick={(e: React.KeyboardEvent<HTMLInputElement>) => { setEditId(null); setTagTitle(''); }}>Cancel</button>
            </div>
          )}

        </li>
      </ul>
    </div>
  );
}

export default ImageTags;