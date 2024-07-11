import React, { useState, useEffect, createContext, useContext } from "react";
import { authCheck } from "./api/User";
import { UserData } from './types/user';

const UserContext = createContext();

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await authCheck();
        setUser(user);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={ user }>
    {children}
  </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};