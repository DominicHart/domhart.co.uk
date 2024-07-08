import axios from 'axios';
import { apiUrl } from '../utils';
import { PhotoRows } from '../types/photo';

export const getPhotos = async(): Promise<PhotoRows> => {
  const response = await axios.get(`${apiUrl()}/photos`);
  return response.data;
}

