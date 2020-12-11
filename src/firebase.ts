import firebase from 'firebase/app';
import { MouseEvent } from 'react';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANSqUdHe1-K4L_nYp8KAhuPKGrWxirshM",
  authDomain: "cookbook-300b5.firebaseapp.com",
  databaseURL: "https://cookbook-300b5.firebaseio.com",
  projectId: "cookbook-300b5",
  storageBucket: "cookbook-300b5.appspot.com",
  messagingSenderId: "836042492115",
  appId: "1:836042492115:web:1fa43ba626e5cf5ca5ec26"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async (
  event: MouseEvent<HTMLButtonElement>
): Promise<void> => {
  event.preventDefault();
  try {
    await auth.signInWithPopup(googleProvider).then((result) => {
      if (!result.user || !result.additionalUserInfo) {
        throw new Error('No user currently logged in!');
      }
    });
    if (!auth.currentUser) {
      throw new Error('No user currently logged in!');
    }
  } catch (error) {
    console.error('Error signing up with google: ', error);
  }
};

const handleSignOut = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('email');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  auth.signOut();
  console.log('signing out');
};

export { auth, firestore, signInWithGoogle, handleSignOut };
