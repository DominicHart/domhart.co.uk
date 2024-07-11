import React, { useEffect } from 'react';
import { File } from '../types/photo';

type props = {
  setFiles: (files: File[]) => void;
  files: File[];
}

const FileDrop: React.FC = (props: props) => {
  const setFiles = (files: File[]) => {
    props.setFiles(files)
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles: File[]) => prevFiles.filter((_, i) => i !== index));
  }

  const handleDrop = (e: any) => {
    e.preventDefault();

    const droppedFiles = e.dataTransfer.files;
    let validFiles = []

    if (droppedFiles.length > 0) {
      for (let i = 0; i < droppedFiles.length; i++) {
        if (droppedFiles[i].type === "image/jpeg") {
          validFiles.push(droppedFiles[i])
        }
      }

      const newFiles = Array.from(validFiles);
      setFiles((prevFiles: File[]) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault();
  }

  const getRemaining = () => {
    let remaining = 500000000 // bytes

    for (const file of props.files) {
      remaining -= file.size
    }

    return (remaining / (1000 * 1000)).toFixed(2)
  }

  const openImageBrowser = (e) => {
    e.preventDefault();
    document.getElementById('imageBrowser').click();
  }

  const selectImages = (e) => {
    const selectedFiles = e.target.files

    if (selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles)
      setFiles((prevFiles: File[]) => [...prevFiles, ...newFiles]);
    }
  }

  useEffect(() => {
  }, [props.files]);

  return (
    <div>
      <div
        id="fileDrop"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <>
          <div className="border border-dashed border-gray-900 p-4 min-h-52">
            {props.files.length === 0 && (
              <div>
                <p className="text-center mb-0">Drag and drop your files here</p>
              </div>
            )}
            {props.files.length > 0 && (
              <div className="file-list">
                <div className="grid grid-cols-3 gap-x-4 gap-y-4">
                  {props.files.map((file, index) => (
                    <div className="relative text-center" key={index}>
                      <img src={URL.createObjectURL(file)} height="169" className="block max-w-full w-full object-cover max-h-full" />
                      <div className="absolute z-10 top-1/2 left-1/2 -translate-1/2">
                        <button onClick={() => removeFile(index)} className="hidden text-code-green bg-code-dark-grey rounded w-10 h-10">
                          <span>&times;</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-100 p-1 text-center m-0 w-full mt-2">
            <p className="m-0">{getRemaining()} MB / 500 MB remaining</p>
          </div>
          <div className="text-left mt-4 mb-2">
            <input type="file" id="imageBrowser" accept="image/jpeg" multiple onChange={selectImages} className="inline-block" />
          </div>
        </>
      </div>
    </div>
  );
};

export default FileDrop;