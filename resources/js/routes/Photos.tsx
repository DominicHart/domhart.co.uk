import React, { useState, useEffect, useContext } from 'react';
import { getPhotos, uploadPhoto } from '../api/Photo';
import { PhotoRows } from '../photogrid/types';
import PhotoGrid from '../photogrid/PhotoGrid';
import { File } from '../types/photo';
import { UserContext } from '../UserContext';
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
};

Modal.setAppElement('#app');

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoRows>({}),
    [files, setFiles] = useState<File[]>([]),
    [modalIsOpen, setIsOpen] = useState(false);

  const user = useContext(UserContext);

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

  const uploadPhotos = (e: any) => {
    e.preventDefault();
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
        fd.append('photos[]', files[i].toString());

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
      <button onClick={openModal}>Open Modal</button>
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
      </Modal>
      <PhotoGrid
        isAuthenticated={typeof user != undefined}
        rows={photos}
      />
    </>
  );
};

export default Photos;