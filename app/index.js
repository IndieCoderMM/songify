import { useRootNavigationState } from 'expo-router';
import { useRouter, useSegments } from 'expo-router';
import { AuthStore, initStore } from '../store';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const Index = () => {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  const { initialized, isLoggedIn } = AuthStore.useState();

  useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    } else if (isLoggedIn) {
      router.replace('/(routes)/home');
    }
  }, [segments, navigationState?.key, initialized]);

  return <View>{!navigationState?.key && <ActivityIndicator />}</View>;
};
export default Index;
