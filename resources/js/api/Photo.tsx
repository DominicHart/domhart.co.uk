import axios from 'axios';
import { apiUrl, getHeaders } from '../utils';
import { PhotoRows, PhotoItem } from 'react-editable-photo-grid';
import { PhotoUpdatedResponse, PhotoPositionsSavedResponse, PhotoReplacedResponse } from '../types/photo';

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

export const savePhotoPositions = async (formData: FormData): Promise<PhotoPositionsSavedResponse> => {
  const response = await axios.post(`${apiUrl()}/photos/save-positions`, formData, buildHeaders());
  return response.data;
}

export const replacePhoto = async (id: string, formData: FormData): Promise<PhotoReplacedResponse> => {
  const response = await axios.post(`${apiUrl()}/photos/${id}/replace`, formData, buildHeaders());
  return response.data;
}

export const deletePhotos = async (selectedPhotoIds: Array<string>): Promise<any> => {
  let formData = new FormData();
  formData.append('ids', JSON.stringify(selectedPhotoIds));

  const response = await axios.post(`${apiUrl()}/photos/delete/`, formData, getHeaders());
  return response.data;
}

export const uploadPhoto = async (
  row: number,
  column: number,
  file: any,
): Promise<boolean> => {
  const fd = new FormData()
  fd.append('row', row)
  fd.append('column', column)
  fd.append('photos[]', file);

  try {
    await axios.post(`${apiUrl()}/photos`, fd, buildHeaders());
    return true;
  } catch (error) {
    console.error('Upload failed:', error);
    return false;
  }
}

export const editPhoto = async (id: string): Promise<PhotoItem | null> => {
  try {
    const response = await axios.get(`${apiUrl()}/photos/${id}/edit`, buildHeaders());
    const photo: PhotoItem = response.data;
    return photo;
  } catch (error) {
    console.error('Edit failed:', error);
    return null;
  }
}

export const updatePhotoDetails = async (id: string, formData: FormData): Promise<PhotoUpdatedResponse> => {
  const response = await axios.post(`${apiUrl()}/photos/${id}`, formData, buildHeaders());
  return response.data;
}