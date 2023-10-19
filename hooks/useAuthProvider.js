import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { useEffect } from 'react';

const useAuthProvider = (provider, config, signInOnSuccess) => {
  let authProvider = null;
  if (provider === 'google') {
    authProvider = Google;
  } else if (provider === 'facebook') {
    authProvider = Facebook;
  } else {
    throw new Error('Invalid provider: ' + provider);
  }

  const [request, response, promptAsync] = authProvider.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === 'success') {
      signInOnSuccess(response);
    }
  }, [response]);

  return promptAsync;
};

export default useAuthProvider;
