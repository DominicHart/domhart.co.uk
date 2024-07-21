import axios from 'axios';
import { apiUrl, getHeaders } from '../utils';

export const authCheck = async(): Promise<any> => {
  try {
    const response = await axios.get(apiUrl() + '/me', getHeaders());
    return response.data.user;
  } catch {
    return null;
  }
}
export const logout = async(): Promise<any> => {
  const response = await axios.get(apiUrl() + '/logout', getHeaders());
  return response.data;
}