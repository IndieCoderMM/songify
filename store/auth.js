import { Store, registerInDevtools } from 'pullstate';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, usersRef } from '../firebase-config';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
});

let prevUserUnsub = () => null;

const watchUserUpdates = ({ userId }) => {
  if (!userId) {
    return;
  }
  return onSnapshot(doc(usersRef, userId), (snap) => {
    if (snap.exists()) {
      const user = snap.data();
      console.log('updated', user);
      AuthStore.update((store) => {
        store.user = user;
      });
    }
  });
};

const getUserUpdates = (userId) => {
  prevUserUnsub();
  prevUserUnsub = watchUserUpdates({ userId });
};

export const appSignIn = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    if (!resp.user) {
      return { error: 'No user found' };
    }

    const docRef = doc(usersRef, resp.user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data();
      // console.log(user);
      AuthStore.update((store) => {
        store.user = user;
        store.isLoggedIn = user ? true : false;
      });

      AuthStore.subscribe((s) => s.user.uid, getUserUpdates);
      return { user };
    } else {
      return { error: 'No user found' };
    }
  } catch (e) {
    return { error: e };
  }
};

export const appSignUp = async (email, password, name) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(resp.user, { displayName: name });

    const createUser = (auth) => {
      return {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        playlists: [],
        favorites: [],
        recentSongs: [],
      };
    };

    const newUser = createUser(auth);
    await setDoc(doc(usersRef, resp.user.uid), newUser);

    AuthStore.update((store) => {
      store.user = newUser;
      store.isLoggedIn = true;
    });

    AuthStore.subscribe((s) => s.user.uid, getUserUpdates);

    return { user: newUser };
  } catch (e) {
    return { error: e };
  }
};

const unsub = onAuthStateChanged(auth, async (user) => {
  let userData = null;
  if (user?.uid) {
    // Fetch user data if user is auto logged in
    const docRef = doc(usersRef, user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      userData = docSnap.data();
    }
  }
  AuthStore.update((store) => {
    store.user = userData ? userData : user;
    store.isLoggedIn = user ? true : false;
    store.initialized = true;
  });
  AuthStore.subscribe((s) => s.user?.uid, getUserUpdates);
});

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

registerInDevtools({ AuthStore });

export default AuthStore;
