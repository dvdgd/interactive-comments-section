import { currentUser } from "../data.json";
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, _] = useState(() => {
    const savedData = localStorage.getItem('data');
    return savedData ? JSON.parse(savedData) : currentUser;
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user: user }}>
      {children}
    </UserContext.Provider>
  );
};
