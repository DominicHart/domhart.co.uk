import axios from 'axios';
import { apiUrl } from '../utils';
import { PhotoRows } from '../photogrid/types';
import { ImageUploadedResponse, PhotoPositionsSavedResponse } from '../types/photo';

export const getPhotos = async (): Promise<PhotoRows> => {
  const response = await axios.get(`${apiUrl()}/photos`);
  return response.data;
}

export const uploadPhoto = async (formData: FormData): Promise<ImageUploadedResponse> => {
  const response = await axios.post(`${apiUrl()}/photos`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });

  return response.data;
}

export const savePhotoPositions = async (formData: FormData): Promise<PhotoPositionsSavedResponse> => {
  const response = await axios.post(`${apiUrl()}/photos/save-positions`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });

  return response.data
}