import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AuthStore } from '../store';

const Index = () => {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  const { initialized, isLoggedIn } = AuthStore.useState();

  useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      router.push('/(auth)/sign-in');
    } else if (isLoggedIn) {
      router.push('/(routes)/home');
    }
  }, [segments, navigationState?.key, initialized]);

  return <View>{!navigationState?.key && <ActivityIndicator />}</View>;
};
export default Index;
