import { Store, registerInDevtools } from 'pullstate';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth, usersRef } from '../firebase-config';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
});

const createNewUser = async (auth) => {
  const user = {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    playlists: [],
    favorites: [],
    recentSongs: [],
  };

  try {
    await setDoc(doc(usersRef, user.uid), user);
  } catch (e) {
    console.log(e);
  }

  AuthStore.update((store) => {
    store.user = user;
    store.isLoggedIn = true;
  });

  return user;
};

const watchUserUpdates = ({ userId }) => {
  if (!userId) {
    return;
  }
  return onSnapshot(doc(usersRef, userId), (snap) => {
    if (snap.exists()) {
      const user = snap.data();

      AuthStore.update((store) => {
        store.user = user;
      });
    }
  });
};

export const getUserUpdates = (userId) => {
  watchUserUpdates({ userId });
};

export const appSignIn = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    if (!resp.user) {
      return { error: 'No user found' };
    }

    // Fetch user data from firestore
    const docRef = doc(usersRef, resp.user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data();
      AuthStore.update((store) => {
        store.user = user;
        store.isLoggedIn = user ? true : false;
      });

      return { user };
    } else {
      return { error: 'No user found' };
    }
  } catch (error) {
    return { error };
  }
};

export const appSignUp = async (email, password, name) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(resp.user, { displayName: name });

    const user = await createNewUser(auth);

    return { user };
  } catch (error) {
    return { error };
  }
};

export const googleSignIn = async ({ id_token }) => {
  const credential = GoogleAuthProvider.credential(id_token);
  try {
    await signInWithCredential(auth, credential);

    let user = null;
    const docRef = doc(usersRef, auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    // Fetch user data from firestore
    if (docSnap.exists()) {
      user = docSnap.data();
    } else {
      user = await createNewUser(auth);
    }
    AuthStore.update((store) => {
      store.user = user;
      store.isLoggedIn = user ? true : false;
    });

    return { user };
  } catch (error) {
    return { error };
  }
};

export const facebookSignIn = async ({ access_token }) => {
  const credential = FacebookAuthProvider.credential(access_token);
  try {
    await signInWithCredential(auth, credential);

    let user = null;
    const docRef = doc(usersRef, auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    // Fetch user data from firestore
    if (docSnap.exists()) {
      user = docSnap.data();
    } else {
      user = await createNewUser(auth);
    }
    AuthStore.update((store) => {
      store.user = user;
      store.isLoggedIn = user ? true : false;
    });

    return { user };
  } catch (error) {
    return { error };
  }
};

export const appSignOut = async () => {
  try {
    await signOut(auth);
    AuthStore.update((store) => {
      store.user = null;
      store.isLoggedIn = false;
    });
    return { user: null };
  } catch (e) {
    return { error: e };
  }
};

registerInDevtools({ AuthStore });

export default AuthStore;
