import React, { createContext, useEffect, useState } from "react";
import * as firebase from 'firebase/app';

export type firebaseUser = firebase.User | null | undefined;

interface IAuthContext {
  currentUser: firebaseUser;
}

export const AuthContext = createContext<IAuthContext>({ currentUser: undefined });

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebaseUser>(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};


