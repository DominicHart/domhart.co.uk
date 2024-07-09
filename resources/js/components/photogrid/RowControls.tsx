import React from 'react';
import { UserData } from '../../types/user';

type props = {
  rowKey: string | number;
  user: UserData | undefined
  isEditing: boolean;
  moveRowUp: (e: any) => void;
  moveRowDown: (e: any) => void;
  rowCount: number
}

const RowControls: React.FC = (props: props) => {
  if (!props.user || !props.isEditing) {
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
      {props.rowKey < rowCount &&
      <li className="block">
          <button className="w-9 h-9 py-0 px-2 block text-white bg-black"  onClick={props.moveRowDown} data-row={props.rowKey}>
              <i className="fas fa-caret-down pointer-events-none" />
          </button>
      </li>
      }
    </ul>
  );
};

export default RowControls;