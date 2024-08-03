import React from 'react';
import { Checkbox, PhotoItem } from 'react-editable-photo-grid';

type PhotoMenuProps = {
  selectedPhotos: Array<string>;
  updateSelectedPhotos: (ids: Array<string>) => void;
  photo: PhotoItem;
  activeDropdown: string;
  openDropdown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openFileBrowser: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  edit: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const PhotoMenu: React.FC<PhotoMenuProps> = ({ photo, updateSelectedPhotos, selectedPhotos, openDropdown, activeDropdown, openFileBrowser, edit }) => {
  return (
    <>
      <Checkbox
        value={photo.id}
        onClick={updateSelectedPhotos}
        checked={selectedPhotos.includes(photo.id)}
      />
      <div className="absolute z-20 top-2.5 right-2.5">
        <button
          className="border-none rounded text-gray-900 py-1 px-4 bg-gray-200 font-bold"
          data-key={photo.id}
          type="button"
          onClick={openDropdown}
        >
          Edit
        </button>
        <ul
          style={{ display: activeDropdown === photo.id ? 'block' : 'none' }}
          className="absolute rounded text-sm bg-white top-9 right-0"
        >
          <li className="block">
            <a
              className="block text-gray-900 font-medium text-sm py-2 px-4 hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200"
              href={photo.id}
              onClick={openFileBrowser}>
              Replace
              </a>
          </li>
          <li className="block">
            <a
              className="block text-gray-900 font-medium text-sm py-2 px-4 hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200"
              href={photo.id}
              onClick={edit}>
              Edit
              </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PhotoMenu;