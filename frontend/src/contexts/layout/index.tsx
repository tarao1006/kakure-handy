import React, { createContext, useState } from "react";
import * as firebase from 'firebase/app';

export type firebaseUser = firebase.User | null | undefined;

interface ILayoutContext {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
}

export const LayoutContext = createContext<ILayoutContext>({ headerTitle: "hoge", setHeaderTitle: (title: string) => {} });

export const LayoutProvider = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState<string>("");

  return (
    <LayoutContext.Provider value={{ headerTitle, setHeaderTitle }}>
      {children}
    </LayoutContext.Provider>
  );
};
