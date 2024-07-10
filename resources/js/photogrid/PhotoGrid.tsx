import React, { useState } from 'react';
import { PhotoGridProps } from './types';
import { sortRow, movePhotoLeft, movePhotoUp, movePhotoDown, movePhotoRight, moveRowUp, moveRowDown } from "./utils";
import RowControls from './components/RowControls';
import PhotoMenu from './components/PhotoMenu';
import PhotoControls from './components/PhotoControls';

const PhotoGrid: React.FC = (props: PhotoGridProps) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMovePhotoUp = (e: any) => {
    movePhotoUp(e, props);
  }

  const handleMovePhotoDown = (e: any) => {
    movePhotoDown(e, props);
  }

  const handleMovePhotoLeft = (e: any) => {
    movePhotoLeft(e, props);
  }

  const handleMovePhotoRight = (e: any) => {
    movePhotoRight(e, props);
  }

  const handleMoveRowUp = (e: any) => {
    moveRowUp(e, props);
  }

  const handleMoveRowDown = (e: any) => {
    moveRowDown(e, props);
  }

  const updateSelectedPhotos = (e: any) => {
    let selectedPhotos = [...props.selectedPhotos];

    if (e.target.checked) {
      selectedPhotos.push(e.target.value);
    } else {
      selectedPhotos = selectedPhotos.filter(function (item) {
        return item !== e.target.value;
      })
    }

    props.updateSelectedPhotos(selectedPhotos);
  }

  const openDropdown = (e: any) => {
    e.preventDefault()
    if (activeDropdown === e.target.dataset.key) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(e.target.dataset.key)
    }
  }

  const openFileBrowser = (e: any) => {

  }

  const confirmDelete = (e: any) => {

  }

  if (Object.keys(props.rows).length === 0) {
    return null;
  }

  return (
    Object.entries(props.rows).map((row) =>
      row[1].length &&
        <div key={'row-' + i} className="flex flex-auto bg-none min-h-0 relative z-10" style={{ padding: props.isEditing === true ? '0 5%' : '0' }}>
          <>
            <RowControls
              rowKey={row[0]}
              isAuthenticated={props.isAuthenticated}
              isEditing={props.isEditing}
              moveRowUp={handleMoveRowUp}
              moveRowDown={handleMoveRowDown}
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
                  isAuthenticated={props.isAuthenticated}
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
                  movePhotoDown={handleMovePhotoDown}
                  movePhotoLeft={handleMovePhotoLeft}
                  movePhotoUp={handleMovePhotoUp}
                  movePhotoRight={handleMovePhotoRight}
                  rowCount={Object.keys(props.rows).length}
                  photoCount={row[1].length}
                />
              </div>
            )}
          </>
        </div>
    )
  );
};

export default PhotoGrid;