import { PhotoItem, PhotoRows, PhotoUlidAndRowKey, PhotoGridProps } from './types';

export const sortRow = (row: PhotoItem[]) => {
  return row.sort((a, b) => parseFloat(a.column) - parseFloat(b.column))
}

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

const swapPhotosAround = (row: any, rowKey: number, rowsCopy: PhotoRows, firstPhoto: PhotoItem, secondPhoto: PhotoItem) => {
  row = deletePhotoFromRowByColumn(row, firstPhoto.column);
  row = deletePhotoFromRowByColumn(row, secondPhoto.column);
  row = addPhotoToRow(row, firstPhoto, secondPhoto.column);
  row = addPhotoToRow(row, secondPhoto, firstPhoto.column);

  delete rowsCopy[rowKey];
  rowsCopy[rowKey] = row;

  return rowsCopy;
}

const getPhotoUlidAndRowKey = (e: any): PhotoUlidAndRowKey => {
  return {
    ulid: e.target.dataset.ulid,
    rowKey: parseInt(e.target.dataset.row)
  }
}

export const movePhotoLeft = (e: any, props: PhotoGridProps) => {
  e.preventDefault();

  const { ulid, rowKey } = getPhotoUlidAndRowKey(e);

  let rowsCopy = { ...props.rows },
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

export const movePhotoRight = (e: any, props: PhotoGridProps) => {
  e.preventDefault();

  const { ulid, rowKey } = getPhotoUlidAndRowKey(e);

  let rowsCopy = { ...props.rows },
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

  return row;
}

export const movePhotoUp = (e: any, props: PhotoGridProps) => {
  e.preventDefault();
  const { ulid, rowKey } = getPhotoUlidAndRowKey(e);

  let rowsCopy = { ...props.rows },
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

export const movePhotoDown = (e: any, props: PhotoGridProps) => {
  e.preventDefault();
  const { ulid, rowKey } = getPhotoUlidAndRowKey(e);

  let rowsCopy = { ...props.rows },
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

export const moveRowUp = (e: any, props: PhotoGridProps) => {
  e.preventDefault();
  const rowKey = parseInt(e.target.dataset.row),
    previousRowKey = rowKey - 1;

  let rowsCopy = { ...props.rows },
    thisRow = sortRow(rowsCopy[rowKey]),
    previousRow = sortRow(rowsCopy[previousRowKey]);

  rowsCopy = swapRows(rowsCopy, thisRow, rowKey, previousRow, previousRowKey);

  props.updateRows(rowsCopy);
  props.increaseChanges();
}

export const moveRowDown = (e: any, props: PhotoGridProps) => {
  e.preventDefault();
  const rowKey = parseInt(e.target.dataset.row),
    nextRowKey = rowKey + 1;

  let rowsCopy = { ...props.rows },
    thisRow = sortRow(rowsCopy[rowKey]),
    nextRow = sortRow(rowsCopy[nextRowKey]);

  rowsCopy = swapRows(rowsCopy, thisRow, rowKey, nextRow, nextRowKey);

  props.updateRows(rowsCopy);
  props.increaseChanges();
}