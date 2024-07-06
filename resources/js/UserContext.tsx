import React, { useState, useEffect, createContext } from "react";
import { authCheck } from "./api/User";
import { UserData } from './types/user';

type UserContextType = {
  user: UserData | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

export const UserProvider: React.FC = () => {
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    const getUser = async () => {
      const { user: UserData, error } = await authCheck();
      if (error) {
        console.log(error);
      } else {
        setUser(UserData);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }} />
  );
};