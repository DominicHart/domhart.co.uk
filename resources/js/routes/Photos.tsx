import React, { useState, useEffect } from 'react';
import { getPhotos, uploadPhoto, savePhotoPositions } from '../api/Photo';
import { PhotoRows } from '../photogrid/types';
import PhotoGrid from '../photogrid/PhotoGrid';
import { File } from '../types/photo';
import { useUser } from '../UserContext';
import { savingData, modalStyles } from "../utils";
import Swal from "sweetalert2";
import Modal from 'react-modal';
import ModalHeader from '../components/modal/ModalHeader';
import FileDrop from '../components/FileDrop';

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
  const [photos, setPhotos] = useState<PhotoRows>({}),
    [files, setFiles] = useState<File[]>([]),
    [modalIsOpen, setIsOpen] = useState(false),
    [selectedPhotos, setSelectedPhotos] = useState([]),
    [changes, setChanges] = useState(0),
    [isEditing, setIsEditing] = useState(false);

  const user = useUser();

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    if (files.length) {
      setFiles([]);
    }

    setIsOpen(false);
  }

  const getData = async () => {
    setPhotos(await getPhotos());
  }

  const saveChanges = (e) => {
    let formData = new FormData();
    formData.append('photos', photos);
    formData.append('changes', changes);

    savePhotoPositions(formData).then((response) => {
      if (!response) {
        Swal.fire('Error', 'An error occurred while saving photo positions!', 'error');
        return;
      } else {
        setChanges(0);
      }
    });
  }

  const uploadPhotos = (e: any) => {
    e.preventDefault();

    if (files.length === 0) {
      Swal.fire('Select Photos', 'You haven\'t selected any photos!', 'warning');
      return;
    }

    savingData('Photos')

    let totalFileSize = 0;

    for (const file of files) {
      totalFileSize += file.size
    }

    if (totalFileSize > 500000000) {
      Swal.fire('Exceeded 500MB', 'The selected files exceed the maximum size limit of 500MB', 'warning')
      return;
    }

    let uploaded = 0,
      failedToUpload = [] as File[],
      row = Object.keys(photos).length + 1 as number,
      column = 0 as number;

    const promises = [];

    for (let i = 0; i < files.length; i++) {
      promises.push(new Promise(resolve => {
        if (i > 0 && i % 3 === 0) {
          row++;
          column = 1;
        } else {
          column++
        }

        let fd = new FormData()
        fd.append('row', row.toString())
        fd.append('column', column.toString())
        fd.append('photos[]', files[i]);

        uploadPhoto(fd).then((response) => {
          if (!response) {
            resolve(failedToUpload.push(files[i]))
          } else {
            resolve(uploaded++)
          }
        });
      }))
    }

    Promise.all(promises)
      .then(result => {
        if (uploaded === files.length) {
          Swal.fire('Photos Uploaded', 'All Photos were successfully uploaded!', 'success')
          getData();
          setFiles([]);
          closeModal();
          return;
        }

        setFiles(failedToUpload);

        Swal.fire({
          title: 'Oops!',
          text: 'The remaining files failed to upload!',
          icon: 'error'
        })
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {user &&
        isEditing ?
        <div className="p-0.5">
          <button type="button" className="bg-gray-300" onClick={openModal}>Open Modal</button>
          <button type="button" className="ml-4" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
        :
        <div className="p-0.5">
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
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
        isAuthenticated={user !== null}
        isEditing={isEditing}
        rows={photos}
        updateRows={setPhotos}
        selectedPhotos={selectedPhotos}
        updateSelectedPhotos={setSelectedPhotos}
        changes={changes}
        increaseChanges={setChanges}
      />
    </>
  );
};

export default Photos;