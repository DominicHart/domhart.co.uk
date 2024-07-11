import React from 'react';
import { RowControlsProps } from "../types";

const RowControls: React.FC = (props: RowControlsProps) => {
  if (!props.isAuthenticated || !props.isEditing) {
    return '';
  }

  return (
    <ul className='absolute block left-1 top-1/2 -translate-y-1/2 z-20'>
      {props.rowKey > 1 &&
        <li className="block">
          <button className="w-9 h-9 py-0 px-2 block text-code-green bg-code-dark-gray text-2xl rounded" onClick={props.moveRowUp} data-row={props.rowKey}>
            &#8593;
          </button>
        </li>
      }
      {props.rowKey < props.rowCount &&
        <li className="block">
          <button className="w-9 h-9 py-0 px-2 block text-code-green bg-code-dark-gray text-2xl rounded" onClick={props.moveRowDown} data-row={props.rowKey}>
            &#8595;
          </button>
        </li>
      }
    </ul>
  );
};

export default RowControls;