import React from 'react';
import { PhotoControlsProps } from '../types';

const PhotoControls: React.FC = (props: PhotoControlsProps) => {
  if (!props.user || !props.isEditing) {
    return '';
  }

  return (
    <ul className="block absolute bottom-2.5 left-1/2 -translate-x-1/2">
      {props.photo.column > 1 &&
        <li>
          <a href="#" onClick={props.moveImageLeft} data-id={props.photo.ulid} data-row={props.rowKey}>
              <i className="fas fa-caret-left" />
          </a>
        </li>
      }
      {parseInt(props.rowKey) > 1 &&
        <li>
            <a href="#" onClick={props.moveImageUp} data-id={props.photo.ulid} data-row={props.rowKey}>
                <i className="fas fa-caret-up"/>
            </a>
        </li>
      }
      {parseInt(props.rowKey) < props.rowCount || parseInt(props.rowKey) === props.rowCount && props.photoCount > 1 ?
        <li>
          <a href="#" onClick={props.moveImageDown} data-id={props.photo.ulid} data-row={props.rowKey}>
            <i className="fas fa-caret-down"/>
          </a>
        </li>: null
      }
      {props.photo.column < props.photoCount &&
        <li>
            <a href="#" onClick={props.moveImageRight} data-id={props.photo.ulid} data-row={props.rowKey}>
                <i className="fas fa-caret-right"/>
            </a>
        </li>
      }
    </ul>
  );
};

export default PhotoControls;