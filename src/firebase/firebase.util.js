import firebase from 'firebase/app';
import 'firebase/firestore';

// For using authantication
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD_fdAVRKlokORtnzuIYho9Ozj4mV8W12E',
  authDomain: 'crown-clothing-e22a1.firebaseapp.com',
  projectId: 'crown-clothing-e22a1',
  storageBucket: 'crown-clothing-e22a1.appspot.com',
  messagingSenderId: '825366932369',
  appId: '1:825366932369:web:74823b43f991f968e4c830',
};
// yarn add firebase
// Instilazie our application
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//* Google Auth Setup
const provider = new firebase.auth.GoogleAuthProvider();

// 1. setting up custome parametar
provider.setCustomParameters({ prompt: 'select_account' });

// 2. config google signin method

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
