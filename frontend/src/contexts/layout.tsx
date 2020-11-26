import React, { createContext } from "react";
import * as firebase from 'firebase/app';

export type firebaseUser = firebase.User | null | undefined;

interface ILayoutContext {}

export const LayoutContext = createContext<ILayoutContext>({});

export const LayoutProvider = ({ children }) => {

  return (
    <LayoutContext.Provider value={{}}>
      {children}
    </LayoutContext.Provider>
  );
};
