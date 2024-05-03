import React, { createContext, useEffect, useState } from 'react';
import { currentUser } from "../data.json";
import { User } from "../types";

interface IUserContext {
  user: User;
  userScoreComment: (params: {
    commentId: string,
    score: number,
  }) => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => {
    const savedData = localStorage.getItem('@user');
    const user = {
      ...currentUser,
      scores: {},
    };

    if (savedData) {
      const localStorageUser = JSON.parse(savedData);
      localStorageUser.scores = {};
    }

    return savedData ? JSON.parse(savedData) : user;
  });

  const userScoreComment: IUserContext['userScoreComment'] = (params) => {
    if (params.score === 0) {
      const scores = user.scores;
      delete scores[params.commentId];
      setUser({
        ...user,
        scores,
      });
      return;
    }

    const newUser = {
      ...user,
      scores: {
        ...user.scores,
        [params.commentId]: params.score,
      }
    }
    setUser(newUser);
  }

  useEffect(() => {
    localStorage.setItem('@user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{
      user: user,
      userScoreComment,
    }}>
      {children}
    </UserContext.Provider>
  );
};
