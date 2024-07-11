import React from 'react';
import { PhotoControlsProps } from '../types';

const PhotoControls: React.FC = (props: PhotoControlsProps) => {
  if (!props.isAuthenticated || !props.isEditing) {
    return '';
  }

  return (
    <ul className="block absolute bottom-1 left-1/2 -translate-x-1/2 text-center">
      {props.photo.column > 1 &&
        <li className="inline-block ml-1">
          <button type="button" className="w-9 h-9 py-0 px-2 block text-code-green bg-code-dark-gray text-2xl rounded" onClick={props.movePhotoLeft} data-ulid={props.photo.ulid} data-row={props.rowKey}>
            &#8592;
          </button>
        </li>
      }
      {parseInt(props.rowKey) > 1 &&
        <li className="inline-block ml-1">
          <button type="button" className="w-9 h-9 py-0 px-2 block text-code-green bg-code-dark-gray text-2xl rounded" onClick={props.movePhotoUp} data-ulid={props.photo.ulid} data-row={props.rowKey}>
            &#8593;
          </button>
        </li>
      }
      {parseInt(props.rowKey) < props.rowCount || parseInt(props.rowKey) === props.rowCount && props.photoCount > 1 ?
        <li className="inline-block ml-1">
          <button type="button" className="w-9 h-9 py-0 px-2 block text-code-green bg-code-dark-gray text-2xl rounded" onClick={props.movePhotoDown} data-ulid={props.photo.ulid} data-row={props.rowKey}>
            &#8595;
          </button>
        </li> : null
      }
      {props.photo.column < props.photoCount &&
        <li className="inline-block ml-1">
          <button type="button" className="w-9 h-9 py-0 px-2 block text-code-green bg-code-dark-gray text-2xl rounded" onClick={props.movePhotoRight} data-ulid={props.photo.ulid} data-row={props.rowKey}>
            &#8594;
          </button>
        </li>
      }
    </ul>
  );
};

export default PhotoControls;