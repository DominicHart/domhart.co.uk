import React, { useState, useEffect } from 'react';
import { PhotoItem, PhotoRows } from '../types/photo';
import { sortRow } from '../utils';

const PhotoGrid: React.FC = ( rows: PhotoRows ) => {
  const deleteRowIfEmpty = (rowsCopy: PhotoRows, rowNumber: number) => {
    if (rows[rowNumber] == undefined) {
      Object.entries(rowsCopy).map(([key, value]: [number, PhotoItem[]]) => {
        if (key > rowNumber) {
          const items = value
          delete rows[key]
          rows[key - 1] = items
        }
      })
    }

    return rows
  }

  const getPhotoFromUlid = (row: any, ulid: string): PhotoItem => {
    return row.find((photo: PhotoItem) => {
        return photo.ulid === ulid
    });   
  }

  const getPhotoFromColumn = (row: any, column: number): PhotoItem => {
    return row.find((photo: PhotoItem) => {
        return photo.column === column
    });   
  }

  const deletePhotoFromRowByColumn = (row: any, column: number): any => {
    return row.filter((photo: PhotoItem) => photo.column !== column)
  }

  const addPhotoToRow = (row: any, photo: PhotoItem, column: number): any => {
    photo.column = column;
    row.push(photo);
    return row;
  }

  const swapPhotosAround = (row:any, rowKey: number, rows: PhotoRows, firstPhoto: PhotoItem, secondPhoto: PhotoItem) => {
    row = deletePhotoFromRowByColumn(row, firstPhoto.column);
    row = deletePhotoFromRowByColumn(row, secondPhoto.column);

    row = addPhotoToRow(row, firstPhoto, secondPhoto.column);
    row = addPhotoToRow(row, secondPhoto, firstPhoto.column);

    delete rows[rowKey];
    rows[rowKey] = row; 

    return rows
  }

  const movePhotoLeft = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();        
    
    const ulid = e.target.dataset.ulid,
      rowKey = parseInt(e.target.dataset.row);

    let rowsCopy = {...rows},
      thisRow = sortRow(rowsCopy[rowKey]);

    const thisPhoto = getPhotoFromUlid(thisRow, ulid);

    if (thisPhoto.column === 1) {
      return;
    }

    const beforePhoto = getPhotoFromColumn(thisRow, thisPhoto.column - 1);

    rowsCopy = swapPhotosAround(thisRow, rowKey, rowsCopy, beforePhoto, thisPhoto);
  }

  const movePhotoRight = (e: React.SyntheticEvent<EventTarget>) => {
      e.preventDefault();  
    
      const ulid = e.target.dataset.ulid,
        rowKey = parseInt(e.target.dataset.row);

      let rowsCopy = {...rows},
        thisRow = sortRow(rowsCopy[rowKey]);

      const thisPhoto = getPhotoFromUlid(thisRow, ulid);

      if (thisPhoto.column === 1) {
        return;
      }

      const afterPhoto = getPhotoFromColumn(thisRow, thisPhoto.column + 1);

      rowsCopy = swapPhotosAround(thisRow, rowKey, rowsCopy, thisPhoto, afterPhoto);
  }
  const movePhotoDown = (e: React.SyntheticEvent<EventTarget>) => {
      e.preventDefault();
  }
  const movePhotoUp = (e: React.SyntheticEvent<EventTarget>) => {
      e.preventDefault();
  }
  const moveRowUp = (e: React.SyntheticEvent<EventTarget>) => {
      e.preventDefault();
  }
  const moveRowDown = (e: React.SyntheticEvent<EventTarget>) => {
      e.preventDefault();
  }
  const handleBeforeImages = (row: PhotoItem[]) => {
      //
  }
  const handleAfterImages = (row: PhotoItem[]) => {
      //
  }
    
};

export default PhotoGrid;