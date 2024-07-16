import React from 'react';

import { PhotoMenuProps } from '../../types/photo';

const PhotoMenu = (props: PhotoMenuProps) => {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 p-2 text-left w-full">
        <div>
          <input
            type="checkbox"
            className="inline-block"
            value={props.photo.id}
            checked={props.selectedPhotos.includes(props.photo.id)}
            onChange={props.updateSelectedPhotos}
          />
        </div>
      </div>
      <div className="absolute z-20 top-2.5 right-2.5">
        <button
          className="border-none rounded text-gray-900 py-1 px-4 bg-gray-200 font-bold"
          data-key={props.photo.id}
          type="button"
          onClick={props.openDropdown}
        >
          Edit
        </button>
        <ul
          style={{ display: props.activeDropdown === props.photo.id ? 'block' : 'none' }}
          className="absolute rounded text-sm bg-white top-9 right-0"
        >
          <li className="block">
            <a
              className="block text-gray-900 font-medium text-sm py-2 px-4 hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200"
              href={props.photo.id}
              onClick={props.openFileBrowser}>
              Replace
              </a>
          </li>
          <li>
            <a
              className="block text-gray-900 font-medium text-sm py-2 px-4 hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200" 
              href={props.photo.id} 
              onClick={props.confirmDelete}>
              Delete
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PhotoMenu;