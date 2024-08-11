import axios from 'axios';
import { apiUrl, getHeaders } from '../utils';
import { Tag } from '../types/tag';

const buildHeaders = () => {
  let headers = getHeaders();
  return headers;
}

export const getTags = async (): Promise<Tag[] | null> => {
  try {
    const response = await axios.get(`${apiUrl()}/tags`);
    return response.data;
  } catch (error) {
    console.error('Tags get failed:', error.response.data);
    return null;
  }
}

export const addTag = async (title: string): Promise<boolean> => {
  try {
    await axios.post(`${apiUrl()}/tags`, { title: title }, buildHeaders());
    return true;
  } catch (error) {
    console.error('Tag add failed:', error.response.data);
    return false;
  }
}

export const updateTag = async (uuid: string, title: string): Promise<boolean> => {
  try {
    await axios.post(`${apiUrl()}/tags/${uuid}`, { title: title, _method: 'PATCH' }, buildHeaders());
    return true;
  } catch (error) {
    console.error('Tag add failed:', error.response.data);
    return false;
  }
}

export const destroyTag = async (uuid: string): Promise<boolean> => {
  try {
    await axios.delete(`${apiUrl()}/tags/${uuid}`, buildHeaders());
    return true;
  } catch (error) {
    console.error('Tag add failed:', error.response.data);
    return false;
  }
}