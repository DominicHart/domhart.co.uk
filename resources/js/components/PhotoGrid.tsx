import React, { useState, useEffect } from 'react';
import { PhotoItem, PhotoRows } from '../types/photo';
import { sortRow } from '../utils';
import { UserContext } from '../UserContext';
import RowControls from './photogrid/RowControls';
import PhotoMenu from './photogrid/PhotoMenu';
import PhotoControls from './photogrid/PhotoControls';

type PhotoUlidAndRowKey = {
  ulid: string;
  rowKey: number;
}

type props = {
  rows: PhotoRows; 
  updateRows: (rows: PhotoRows) => void; 
  changes: number; 
  increaseChanges: () => void; 
  isEditing: boolean;
  selectedPhotos: Array<string>;
  updateSelectedPhotos: (ids: Array<string>) => void;
}

const PhotoGrid: React.FC = ( props: props ) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const user = useContext(UserContext);

  const deleteRowIfEmpty = (rowsCopy: PhotoRows, rowNumber: number) => {
    if (rowsCopy[rowNumber] == undefined) {
      Object.entries(rowsCopy).map(([key, value]: [number, PhotoItem[]]) => {
        if (key > rowNumber) {
          delete rowsCopy[key];
          rowsCopy[key - 1] = value;
        }
      });
    }

    return rowsCopy;
  }

  const getPhotoFromUlid = (row: any, ulid: string): PhotoItem => {
    return row.find((photo: PhotoItem) => {
        return photo.ulid === ulid;
    });   
  }

  const getPhotoFromColumn = (row: any, column: number): PhotoItem => {
    return row.find((photo: PhotoItem) => {
        return photo.column === column;
    });   
  }

  const deletePhotoFromRowByColumn = (row: any, column: number): any => {
    return row.filter((photo: PhotoItem) => photo.column !== column);
  }

  const addPhotoToRow = (row: any, photo: PhotoItem, column: number): any => {
    photo.column = column;
    row.push(photo);
    return row;
  }

  const swapPhotosAround = (row:any, rowKey: number, rowsCopy: PhotoRows, firstPhoto: PhotoItem, secondPhoto: PhotoItem) => {
    row = deletePhotoFromRowByColumn(row, firstPhoto.column);
    row = deletePhotoFromRowByColumn(row, secondPhoto.column);

    row = addPhotoToRow(row, firstPhoto, secondPhoto.column);
    row = addPhotoToRow(row, secondPhoto, firstPhoto.column);

    delete rowsCopy[rowKey];
    rowsCopy[rowKey] = row; 

    return rowsCopy;
  }

  const getPhotoUlidAndRowKey = (e: React.SyntheticEvent<EventTarget>): PhotoUlidAndRowKey =>
  {
    return {
      ulid: e.target.dataset.ulid,
      rowKey: parseInt(e.target.dataset.row)
    }
  } 

  const movePhotoLeft = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();        
    
    const { ulid, rowKey } = getPhotoUlidAndRowKey(e);

    let rowsCopy = {...props.rows},
      thisRow = sortRow(rowsCopy[rowKey]);

    const thisPhoto = getPhotoFromUlid(thisRow, ulid);

    if (thisPhoto.column === 1) {
      return;
    }

    const beforePhoto = getPhotoFromColumn(thisRow, thisPhoto.column - 1);
    rowsCopy = swapPhotosAround(thisRow, rowKey, rowsCopy, beforePhoto, thisPhoto);

    props.updateRows(rowsCopy);
    props.increaseChanges();
  }

  const movePhotoRight = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();  
  
    const { ulid, rowKey } = getPhotoUlidAndRowKey(e);

    let rowsCopy = {...props.rows},
      thisRow = sortRow(rowsCopy[rowKey]);

    const thisPhoto = getPhotoFromUlid(thisRow, ulid);

    if (thisPhoto.column === 1) {
      return;
    }

    const afterPhoto = getPhotoFromColumn(thisRow, thisPhoto.column + 1);
    rowsCopy = swapPhotosAround(thisRow, rowKey, rowsCopy, thisPhoto, afterPhoto);

    props.updateRows(rowsCopy);
    props.increaseChanges();
  }

  /**
   * All photos in the row move back a column (to the left)
   * @param row 
   * @param start 
   * @param end 
   */
  const shufflePhotosBackOneColumn = (row: any, start: number, end: number): any => {
    for (let x = start; x <= end; x++) {
      const selectedPhoto = getPhotoFromColumn(row, x);
      row = deletePhotoFromRowByColumn(row, x);
      row = addPhotoToRow(row, selectedPhoto, selectedPhoto.column - 1);
    }

    return row;
  }

  const shufflePhotosForwardOneColumn = (row: any, start: number): any => {
    for (let x = start; x >= 0; x--) {
      const selectedPhoto = getPhotoFromColumn(row, x);
      row = deletePhotoFromRowByColumn(row, x);
      row = addPhotoToRow(row, selectedPhoto, selectedPhoto.column + 1);
    }
  }
  
  const movePhotoUp = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const { ulid, rowKey } = getPhotoUlidAndRowKey(e);

    let rowsCopy = {...props.rows},
      thisRow = sortRow(rowsCopy[rowKey]),
      previousRowKey = rowKey - 1;

    if (rowsCopy[previousRowKey] == undefined) {
      while (rowsCopy[previousRowKey] == undefined) {
        previousRowKey = previousRowKey - 1;
      }
    }

    const thisPhoto = getPhotoFromUlid(thisRow, ulid);
    let previousRow = sortRow(rowsCopy[previousRowKey]),
      start = thisPhoto.column + 1, 
      end = thisRow.length;

    thisRow = deletePhotoFromRowByColumn(thisRow, thisPhoto.column);
    delete rowsCopy[rowKey];

    if (thisRow.length) {
      shufflePhotosBackOneColumn(thisRow, start, end);
      rowsCopy[rowKey] = thisRow;
    }

    previousRow = addPhotoToRow(previousRow, thisPhoto, previousRow.length + 1);
    delete rowsCopy[previousRowKey];
    rowsCopy[previousRowKey] = previousRow;

    props.updateRows(rowsCopy);
    props.increaseChanges();
  }

  const movePhotoDown = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const { ulid, rowKey } = getPhotoUlidAndRowKey(e);

    let rowsCopy = {...props.rows},
      thisRow = sortRow(rowsCopy[rowKey]),
      nextRowKey = rowKey + 1;

    const thisPhoto = getPhotoFromUlid(thisRow, ulid);
    let start = thisPhoto.column + 1, 
     end = thisRow.length;

    thisRow = deletePhotoFromRowByColumn(thisRow, thisPhoto.column);
    delete rowsCopy[rowKey];

    if (thisRow.length) {
      shufflePhotosBackOneColumn(thisRow, start, end);
    }

    let nextRow = null;

    if (rowsCopy[nextRowKey] == undefined) {
      thisPhoto.column = 1;
      nextRow = [thisPhoto];
    } else {
      nextRow = sortRow(rowsCopy[nextRowKey]);
    }

    nextRow = shufflePhotosForwardOneColumn(nextRow, nextRow.length - 1);
    nextRow = addPhotoToRow(addPhotoToRow, thisPhoto, 1);
    delete rowsCopy[nextRowKey];
    rowsCopy[nextRowKey] = nextRow;

    props.updateRows(rowsCopy);
    props.increaseChanges();
  }

  /**
   * Swaps the row order
   * @param rows 
   * @param firstRow 
   * @param firstRowKey 
   * @param secondRow 
   * @param secondRowKey 
   */
  const swapRows = (rows: PhotoRows, firstRow: any, firstRowKey: number, secondRow: any, secondRowKey: number): any => {
    delete rows[secondRowKey];
    delete rows[firstRowKey];

    rows[secondRowKey] = firstRow;
    rows[firstRowKey] = secondRow;

    return rows;
  }

  const moveRowUp = (e: any) => {
      e.preventDefault();

    const rowKey = parseInt(e.target.dataset.row),
      previousRowKey = rowKey - 1;

    let rowsCopy = {...props.rows},
      thisRow = sortRow(rowsCopy[rowKey]),
      previousRow = sortRow(rowsCopy[previousRowKey]);

    rowsCopy = swapRows(rowsCopy, thisRow, rowKey, previousRow, previousRowKey);

    props.updateRows(rowsCopy);
    props.increaseChanges();
  }

  const moveRowDown = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const rowKey = parseInt(e.target.dataset.row),
      nextRowKey = rowKey + 1;

    let rowsCopy = {...props.rows},
      thisRow = sortRow(rowsCopy[rowKey]),
      nextRow = sortRow(rowsCopy[nextRowKey]);

    rowsCopy = swapRows(rowsCopy, thisRow, rowKey, nextRow, nextRowKey);

    props.updateRows(rowsCopy);
    props.increaseChanges();
  }

  const updateSelectedPhotos = (e: any) => {
    let selectedPhotos = [...props.selectedPhotos];

    if (e.target.checked) {
      selectedPhotos.push(e.target.value);
    } else {
      selectedPhotos = selectedPhotos.filter(function(item) {
        return item !== e.target.value;
      })
    }

    props.updateSelectedPhotos(selectedPhotos);
  }

  const openDropdown = (e) => {
    e.preventDefault();
  }

  const openFileBrowser = (e) => {

  }

  const confirmDelete = (e) => {

  }


  if (Object.keys(props.rows).length === 0) {
    return null;
  }

  return (
    Object.entries(props.rows).map((row, i) =>
      row[1].length ? 
        <div key={'row-' + i} className="flex flex-auto bg-none min-h-0 relative z-10" style={{padding: props.isEditing === true ? '0 5%' : '0'}}>
          <>
            <RowControls
              rowKey={row[0]}
              user={user}
              isEditing={props.isEditing}
              moveRowUp={moveRowUp}
              moveRowDown={moveRowDown}
              rowCount={Object.keys(props.rows).length}
            />
            {sortRow(row[1]).map((photo, i2) =>
              <div key={'photo-' + i + i2} className="align-middle block relative m-0.5">
                <img 
                  width={photo.width} 
                  height={photo.height} 
                  data-ulid={photo.ulid} 
                  src={"/api/photo/" + photo.thumbnail_path} 
                  alt={photo.thumbnail_path}
                  className="inline-block max-w-full max-h-[700px] h-auto m-0 select-none" 
                />
                <PhotoMenu
                  rowKey={row[0]}
                  user={user}
                  isEditing={props.isEditing}
                  selectedPhotos={props.selectedPhotos}
                  updateSelectedPhotos={updateSelectedPhotos}
                  photo={photo}
                  activeDropdown={activeDropdown}
                  openDropdown={openDropdown}
                  openFileBrowser={openFileBrowser}
                  confirmDelete={confirmDelete}
                />
                <PhotoControls
                  rowKey={row[0]}
                  user={user}
                  isEditing={props.isEditing}
                  photo={photo}
                />
              </div>
            )}
          </>
        </div>
        : null
    ) : null
  );
};

export default PhotoGrid;