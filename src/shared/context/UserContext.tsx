import { currentUser } from "../data.json";
import React, { createContext, useState, useEffect } from 'react';
import { User } from "../types";

interface IUserContext {
  user: User;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, _] = useState(() => {
    const savedData = localStorage.getItem('@user');
    return savedData ? JSON.parse(savedData) : currentUser;
  });

  useEffect(() => {
    localStorage.setItem('@user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user: user }}>
      {children}
    </UserContext.Provider>
  );
};
