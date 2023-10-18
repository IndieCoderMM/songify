import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import AuthStore, { getUserUpdates } from '../store/auth';
import { auth, usersRef } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Index = () => {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  const { initialized, isLoggedIn } = AuthStore.useState();

  useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (isLoggedIn) {
      router.replace('/home');
    }
  }, [segments, navigationState?.key, initialized]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      let userData = null;
      if (user?.uid && !initialized) {
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
      // Subscribe to firestore updates
      AuthStore.subscribe((s) => s.user?.uid, getUserUpdates);
    });

    return () => {
      unsub();
    };
  }, []);

  return <View>{!navigationState?.key && <ActivityIndicator />}</View>;
};
export default Index;
