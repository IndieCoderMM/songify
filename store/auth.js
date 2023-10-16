import { Store, registerInDevtools } from 'pullstate';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase-config';

const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
});

const unsub = onAuthStateChanged(auth, (user) => {
  AuthStore.update((store) => {
    store.user = user;
    store.isLoggedIn = user ? true : false;
    store.initialized = true;
  });
});

export const appSignIn = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    AuthStore.update((store) => {
      store.user = resp.user;
      store.isLoggedIn = resp.user ? true : false;
    });
    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};

export const googleSignIn = async ({ id_token }) => {
  const credential = GoogleAuthProvider.credential(id_token);
  try {
    const resp = await signInWithCredential(auth, credential);
    AuthStore.update((store) => {
      store.user = resp.user;
      store.isLoggedIn = resp.user ? true : false;
    });
    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
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

export const appSignUp = async (email, password, name) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(resp.user, { displayName: name });

    AuthStore.update((store) => {
      store.user = auth.currentUser;
      store.isLoggedIn = true;
    });

    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};

registerInDevtools({ AuthStore });

export default AuthStore;
