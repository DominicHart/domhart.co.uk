import React, { useState, useEffect, createContext, useContext } from "react";
import { authCheck } from "./api/User";
import { UserData } from './types/user';

interface UserContextProps {
  user: UserData | null;
  loading: boolean;
  error: any;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const authUser = await authCheck();
        setUser(authUser);
      } catch (err) {
        setError(err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};