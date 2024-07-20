import axios from 'axios';
import { apiUrl, getHeaders } from '../utils';
import { PhotoRows } from 'react-editable-photo-grid';
import { ImageUploadedResponse, PhotoPositionsSavedResponse, PhotoReplacedResponse } from '../types/photo';

export const getPhotos = async (): Promise<PhotoRows> => {
  const response = await axios.get(`${apiUrl()}/photos`);
  return response.data;
}

const buildHeaders = () => {
  let headers = getHeaders();
  headers.headers['content-type'] = 'multipart/form-data';
  console.log(headers);
  return headers;
}

export const uploadPhoto = async (formData: FormData): Promise<ImageUploadedResponse> => {
  const response = await axios.post(`${apiUrl()}/photos`, formData, buildHeaders());

  return response.data;
}

export const savePhotoPositions = async (formData: FormData): Promise<PhotoPositionsSavedResponse> => {
  const response = await axios.post(`${apiUrl()}/photos/save-positions`, formData, buildHeaders());

  return response.data;
}

export const replacePhoto = async (id: string, formData: FormData): Promise<PhotoReplacedResponse> => {
  const response = await axios.post(`${apiUrl()}/photos/${id}`, formData, buildHeaders());

  return response.data;
}

export const deletePhotos = async (selectedPhotoIds: Array<string>): Promise<any> => {
  let formData = new FormData();
  formData.append('ids', JSON.stringify(selectedPhotoIds));

  const response = await axios.post(`${apiUrl()}/photos/delete/`, formData, getHeaders());
  return response.data;
}