import React from 'react';

import { PhotoMenuProps } from '../types';

const RowControls: React.FC = (props: PhotoMenuProps) => {
  if (!props.isAuthenticated || !props.isEditing) {
    return '';
  }

  return (
    <>
      <div className="absolute top-0 left-0 z-10 p-2 text-center w-full">
        <div className="inline-block bg-black/[.6] text-white rounded p-2">
          <input
            type="checkbox"
            className="inline-block"
            value={props.photo.ulid}
            checked={props.selectedPhotos.includes(props.photo.ulid)}
            onChange={props.updateSelectedPhotos}
          />
          <p className="inline-block ml-2">R: {props.rowKey} | C: {props.photo.column}</p>
        </div>
      </div>
      <div className="hidden absolute z-20 top-2.5 left-2.5">
        <button
          className="border-none text-gray-900 py-2 px-4 bg-black font-bold"
          data-dropdown-key={props.photo.ulid}
          type="button"
          onClick={props.openDropdown}
        >
          <i className="fas fa-edit pointer-events-none" />
        </button>
        <ul
          style={{ display: props.activeDropdown === props.photo.ulid ? 'block' : 'hidden' }}
          className="absolute bg-white top-9 right-0"
        >
          <li className="block">
            <a
              className="block text-gray-900 font-medium text-sm py-2 px-4 hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200"
              href={props.photo.ulid}
              onClick={props.openFileBrowser}>
              Replace
              </a>
          </li>
          <li>
            <a href={props.photo.ulid} data-row={props.rowKey} onClick={props.confirmDelete}>
              Delete
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RowControls;