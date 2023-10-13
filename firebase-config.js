import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBtlemRpvyUVjpH7dsAHA7s8fZdUUT6new',
  authDomain: 'songify-9913b.firebaseapp.com',
  projectId: 'songify-9913b',
  storageBucket: 'songify-9913b.appspot.com',
  messagingSenderId: '1071974658919',
  appId: '1:1071974658919:web:211cef35eb55960abdf5c2',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, { type: 'LOCAL' });
