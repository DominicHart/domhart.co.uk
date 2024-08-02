import React, { useState, useEffect } from 'react';
import { getPhotos, uploadPhoto, savePhotoPositions, replacePhoto, deletePhotos } from '../api/Photo';
import { PhotoGrid, PhotoItem, PhotoRows, sortPhotosIntoRows } from 'react-editable-photo-grid';
import { File } from '../types/photo';
import { useUser } from '../UserContext';
import { savingData } from "../utils";
import Swal from "sweetalert2";
import Modal from 'react-modal';
import ModalHeader from '../components/modal/ModalHeader';
import FileDrop from '../components/FileDrop';
import PhotoMenu from '../components/photogrid/PhotoMenu';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '600px',
    width: '80%',
    background: 'white',
  },
  overlay: { zIndex: 1000 }
};

Modal.setAppElement('#app');

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]),
    [rows, setRows] = useState<PhotoRows>([]),
    [loading, setLoading] = useState<boolean>(true),
    [files, setFiles] = useState<File[]>([]),
    [modalIsOpen, setIsOpen] = useState<boolean>(false),
    [selectedPhotos, setSelectedPhotos] = useState<Array<string>>([]),
    [changes, setChanges] = useState<number>(0),
    [isEditing, setIsEditing] = useState<boolean>(false),
    [activeDropdown, setActiveDropdown] = useState(null);

  const user = useUser();

  const openModal = () => {
    if (changes > 0) {
      Swal.fire('Save Changes', 'Please save your changes before uploading new photos!', 'warning');
      return;
    }

    setIsOpen(true);
  }

  const closeModal = () => {
    if (files.length) {
      setFiles([]);
    }

    setIsOpen(false);
  }

  const getData = async () => {
    const photos = await getPhotos();
    setPhotos(photos);
    setRows(sortPhotosIntoRows(photos));
    setLoading(false);
  }

  const saveChanges = (e: any) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('photos', JSON.stringify(rows));
    formData.append('changes', changes.toString());

    savePhotoPositions(formData).then((response) => {
      if (!response) {
        Swal.fire('Error', 'An error occurred while saving photo positions!', 'error');
        return;
      } else {
        setChanges(0);
      }
    });
  }

  const processPhotos = async () => {
    let totalFileSize = files.reduce((total, file) => total + file.size, 0);

    if (totalFileSize > 500000000) {
      Swal.fire('Exceeded 500MB', 'The selected files exceed the maximum size limit of 500MB', 'warning')
      return;
    }

    Swal.fire({
      title: 'Uploading Photos',
      html: `<div>Uploading photo <span id="uploadProgress">0</span>/${files.length}...</div>`,
      icon: 'info',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    let failedToUpload = [],
      row = Object.keys(rows).length + 1,
      column = 0,
      processed = 0;

    for (const file of files) {
      document.getElementById('uploadProgress').innerHTML = (processed + 1);

      if (processed > 0 && processed % 3 === 0) {
        row++;
        column = 1;
      } else {
        column++
      }

      try {
        const response = await uploadPhoto(row, column, file);
        if (!response) {
          failedToUpload.push(file);
        }
      } catch {
        failedToUpload.push(file);
      }

      processed++;
    }

    return failedToUpload;
  }

  const uploadPhotos = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const failedToUpload = await processPhotos();

    if (failedToUpload.length > 0) {
      setFiles(failedToUpload);

      Swal.fire({
        title: 'Oops!',
        text: 'The remaining files failed to upload!',
        icon: 'error'
      });

      return;
    }

    closeModal();
    Swal.fire('Photos Uploaded', 'All Photos were successfully uploaded!', 'success');
    getData();
  }

  const openDropdown = (e: any) => {
    e.preventDefault();

    if (activeDropdown === e.target.dataset.key) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(e.target.dataset.key)
    }
  }

  const openFileBrowser = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const fileBrowser = document.getElementById('imageSelection'),
      id = e.currentTarget.getAttribute('href');

    if (!id) {
      throw new TypeError('id missing!');
    }

    if (fileBrowser) {
      fileBrowser.dataset.id = id;
      fileBrowser.click();
    }
  }

  const updatePhoto = (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      Swal.fire('Aborted', 'No Photo Selected', 'warning');
      return;
    }

    savingData('Photos');

    let formData = new FormData();
    formData.append('photo', file);
    formData.append('_method', 'PATCH');

    replacePhoto(e.target.dataset.id, formData).then((response) => {
      if (!response) {
        Swal.fire('Upload Failed', 'The photo was not replaced due to an unexpected error');
      } else {
        Swal.close();
        getData();
      }
    });
  }

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (changes > 0) {
      Swal.fire('Save Changes', 'You have unsaved changes that will be lost, please save them before you continue', 'warning');
      return;
    }
    
    if (!selectedPhotos.length) {
      Swal.fire('Select Photos', 'No photos selected!', 'warning');
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete the selected photos",
      icon: "warning",
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        deletePhotos(selectedPhotos).then((result) => {
          setSelectedPhotos([]);
          getData();
        }).catch(() => {
          Swal.fire('Error', 'An error occurred while deleting photos', 'error');
        })
      }
    })
  }

  const updateSelectedPhotos = (value: string, checked: boolean): void => {
    let newSelectedPhotos = [...selectedPhotos];

    if (checked) {
      newSelectedPhotos.push(value);
    } else {
      newSelectedPhotos = newSelectedPhotos.filter(function (item) {
        return item !== value;
      })
    }

    setSelectedPhotos(newSelectedPhotos);
  }

  useEffect(() => {
    getData();
  }, []);

  const photoMenu = <PhotoMenu
    selectedPhotos={selectedPhotos}
    updateSelectedPhotos={updateSelectedPhotos}
    activeDropdown={activeDropdown}
    openDropdown={openDropdown}
    openFileBrowser={openFileBrowser}
  />

  if (loading) {
    return <div className="h-[calc(100vh-112px)] relative">
      <div className="relative top-1/2 -translate-y-1/2 text-center w-full">
        <img src="../../images/loader.gif" alt="Loading" className="max-w-full w-[200px] h-auto inline-block" width="200" />
      </div>
    </div>;
  }

  return (
    <div className="min-h-[calc(100vh-112px)]">
      <div className="py-10 px-6">
        <h1 className="text-5xl md:text-center font-semibold text-gray-800">Photos</h1>
        <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">In my free time I like to practice photography. My favourite theme is Zoo Animals but I've also explored Macro and Wildlife. Below is a small collection of my favourite photos.</p>
      </div>
      {user.user ?
        isEditing ?
          <div className="px-1 text-center my-2">
            <button type="button" className="rounded inline-block bg-blue-500 py-1 px-4 font-semibold text-white" onClick={openModal}>Upload Photos</button>
            {changes > 0 &&
              <button type="button" className="rounded inline-block bg-green-500 text-white py-1 px-4 font-semibold ml-2" onClick={saveChanges}>Save Changes</button>
            }
            {selectedPhotos.length > 0 &&
              <button type="button" className="rounded inline-block bg-red-500 text-white py-1 px-4 font-semibold ml-2" onClick={confirmDelete}>Delete Photos</button>
            }
            <button type="button" className="rounded inline-block bg-gray-200 py-1 px-4 font-semibold ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
          :
          <div className="px-1 text-center my-2">
            <button className="rounded inline-block bg-gray-200 py-1 px-4 font-semibold" type="button" onClick={() => setIsEditing(true)}>Edit Photo Grid</button>
          </div> : <div className="h-0.5" />
      }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <ModalHeader
          title="Upload Images"
          closeModal={closeModal}
        />
        <FileDrop
          files={files}
          setFiles={setFiles}
        />
        <div className="text-right border-t border-gray-300 mt-6 py-6 px-3">
          <button type="button" className="border border-gray-300 py-3 px-6 font-semibold bg-gray-300 rounded" onClick={closeModal}>Dismiss</button>
          <button type="button" className="border border-code-dark-gray font-semibold py-3 px-6 ml-2 bg-code-dark-gray text-code-green rounded" onClick={uploadPhotos}>Upload Photos</button>
        </div>
      </Modal>
      <PhotoGrid
        isEditing={isEditing && user.user !== null}
        photos={photos}
        rows={rows}
        updateRows={setRows}
        selectedPhotos={selectedPhotos}
        updateSelectedPhotos={setSelectedPhotos}
        changes={changes}
        increaseChanges={() => setChanges(changes + 1)}
        photoMenu={photoMenu}
        imageSrcPrefix="/api/photos/"
        imageSrcProperty="thumbnail_path"
        useGallery={true}
        gallerySrcProperty="image_path"
      />
      <input type="file" className="hidden" id="imageSelection" onChange={updatePhoto} />
    </div>
  );
};

export default Photos;