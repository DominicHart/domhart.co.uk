import axios from 'axios';
import { UserData } from '../types/user';
import { apiUrl, getHeaders } from '../utils';

export const authCheck = async(): Promise<UserData | null> => {
  const response = await axios.get(apiUrl() + '/me', getHeaders());
  const user: UserData = response.data.user;

  if (user) {
    return user;
  }
  
  return null;
}