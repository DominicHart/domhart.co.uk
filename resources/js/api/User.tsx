import axios from 'axios';
import { UserData } from '../types/user';
import { apiUrl } from '../utils';

export const authCheck = async(): Promise<{ user?: UserData, error?: string }> => {
  const response = await axios.get(apiUrl() + '/me');

  if (response.data.error === null) {
    const user: UserData = response.data.user;
    return { user };
  } else {
    const error: string = response.data.error;
    return { error };
  }
}