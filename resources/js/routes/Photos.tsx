import React, { useState, useEffect } from 'react';
import { getPhotos } from '../api/Photo';
import { PhotoRows } from '../types/photo';
import PhotoGrid from '../components/PhotoGrid';

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoRows>({});

  const getData = async() => {
    setPhotos(await getPhotos());
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PhotoGrid
        rows={photos}
      />
    </>
  );
};

export default Photos;