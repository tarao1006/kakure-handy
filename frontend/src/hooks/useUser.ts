import * as React from "react";
import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

firebase.initializeApp(firebaseConfig);

export interface UserStatus {
  updated: boolean
  user: firebase.User
}

const useUser = () => {
  const [userStatus, setUserStatus] = React.useState<UserStatus>({ updated: false, user: firebase.auth().currentUser })

  React.useEffect(() => {
    if (userStatus.user) {
      setUserStatus({ updated: true, user: userStatus.user });
      return;
    }
    let cleanedUp = false;
    const unsubscribe = async () => {
      firebase.auth().onAuthStateChanged(user => {
        if (!cleanedUp) {
          if (user) {
            setUserStatus({ updated: true, user: user });
          } else {
            setUserStatus({ updated: true, user: null });
          }
        }
      });
    }
    unsubscribe();
    const cleanUp = () => {
      cleanedUp = true;
    }
    return cleanUp;
  }, []);

  const login = async (email: string, password: string, persist: boolean) => {
    const persistence = persist ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.NONE;
    await firebase.auth().setPersistence(persistence);
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  const logout = async () => {
    await firebase.auth().signOut();
  }

  return { userStatus, login, logout }
}

export default useUser;
