import React, { useState, useEffect } from 'react';
import { getPhotos, uploadPhoto, savePhotoPositions, replacePhoto, deletePhotos } from '../api/Photo';
import { PhotoGrid, PhotoRows } from 'react-editable-photo-grid';
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
  const [photos, setPhotos] = useState<PhotoRows>({}),
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
    const rows = await getPhotos();
    setPhotos(rows);
    setLoading(false);
  }

  const saveChanges = (e: any) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('photos', JSON.stringify(photos));
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

  const uploadPhotos = (e: any) => {
    if (changes > 0) {
      Swal.fire('Save Changes', 'Please save your changes before uploading new photos!', 'warning');
      return;
    }

    e.preventDefault();

    if (files.length === 0) {
      Swal.fire('Select Photos', 'You haven\'t selected any photos!', 'warning');
      return;
    }

    savingData('Photos');

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

  const openDropdown = (e: any) => {
    e.preventDefault();

    if (activeDropdown === e.target.dataset.key) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(e.target.dataset.key)
    }
  }

  const openFileBrowser = (e: Event) => {
    e.preventDefault();
    const fileBrowser = document.getElementById('imageSelection'),
      id = e.target.getAttribute('href');

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

  const updateSelectedPhotos = (e: any) => {
    let newSelectedPhotos = [...selectedPhotos];

    if (e.target.checked) {
      newSelectedPhotos.push(e.target.value);
    } else {
      newSelectedPhotos = newSelectedPhotos.filter(function (item) {
        return item !== e.target.value;
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
    <div>
      <div className="py-10 px-6">
        <h1 className="text-5xl md:text-center font-semibold text-gray-800">Photos</h1>
        <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">In my free time I like to practice photography. My favourite theme is Zoo Animals but I've also explored Macro and Wildlife. Below is a small collection of my favourite photos.</p>
      </div>
      {user ?
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
        isEditing={isEditing && user !== null}
        rows={photos}
        updateRows={setPhotos}
        selectedPhotos={selectedPhotos}
        updateSelectedPhotos={setSelectedPhotos}
        changes={changes}
        increaseChanges={() => setChanges(changes + 1)}
        photoMenu={photoMenu}
        imageSrcPrefix="/api/photos/"
        imageSrcProperty="thumbnail_path"
      />
      <input type="file" className="hidden" id="imageSelection" onChange={updatePhoto} />
    </div>
  );
};

export default Photos;