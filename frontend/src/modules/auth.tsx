import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey:     process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

firebase.initializeApp(firebaseConfig);

const login = async (email: string, password: string, persist: boolean) => {
  const persistence = persist ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.NONE;
  await firebase.auth().setPersistence(persistence);
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

const logout = () => {
  return firebase.auth().signOut();
}

const resetEmail = (email: string) => {
  return firebase.auth().sendPasswordResetEmail(email, {url: process.env.BACKEND_URL});
}

export { login, logout, resetEmail };
