import React from 'react';
import { RowControlsProps } from "../types";

const RowControls: React.FC = (props: RowControlsProps) => {
  if (!props.isAuthenticated || !props.isEditing) {
    return '';
  }

  return (
    <ul className='absolute block left-0 top-1/2 -translate-y-1/2 z-20'>
      {props.rowKey > 1 &&
        <li className="block">
          <button className="w-9 h-9 py-0 px-2 block text-white bg-black" onClick={props.moveRowUp} data-row={props.rowKey}>
            <i className="fas fa-caret-up pointer-events-none" />
          </button>
        </li>
      }
      {props.rowKey < props.rowCount &&
        <li className="block">
          <button className="w-9 h-9 py-0 px-2 block text-white bg-black" onClick={props.moveRowDown} data-row={props.rowKey}>
            <i className="fas fa-caret-down pointer-events-none" />
          </button>
        </li>
      }
    </ul>
  );
};

export default RowControls;