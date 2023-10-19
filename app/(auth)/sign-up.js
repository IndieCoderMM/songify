import {
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';

import { appSignUp, googleSignIn } from '../../store/auth';
import styles from '../../styles/auth.style';
import { SIZES } from '../../constants/theme';
import { Logo } from '../../constants/images';
import useAuthProvider from '../../hooks/useAuthProvider';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CONFIG = {
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
};

const FACEBOOK_CONFIG = {
  clientId: process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_ID,
};

const SignUp = () => {
  const promptAsyncGoogle = useAuthProvider('google', GOOGLE_CONFIG, (resp) =>
    onGoogleSuccess(resp),
  );
  const promptAsyncFacebook = useAuthProvider(
    'facebook',
    FACEBOOK_CONFIG,
    (resp) => onFacebookSuccess(resp),
  );
  const router = useRouter();
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const onGoogleSuccess = async (response) => {
    const { id_token } = response.params;
    const resp = await googleSignIn({ id_token });
    // console.log('Google Sign Up Response', resp);
    if (resp.user) {
      router.replace('/home');
    } else {
      console.log(resp.error);
      Alert.alert('Sign In Error', resp.error?.message);
    }
  };

  const onFacebookSuccess = async (response) => {
    const { access_token } = response.params;
    const resp = await facebookSignIn({ access_token });
    console.log('Facebook Sign Up Response', resp);
    if (resp.user) {
      router.replace('/home');
    } else {
      console.log(resp.error);
      Alert.alert('Sign In Error', resp.error?.message);
    }
  };

  const handleSignUp = async () => {
    const name = nameRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    if (!name || !email || !password) {
      Alert.alert('Cannot Sign Up', 'Please fill in all fields');
      return;
    }

    const resp = await appSignUp(email, password, name);
    if (resp?.user) {
      router.replace('/home');
    } else {
      console.log(resp.error);
      Alert.alert('Sign Up Error', resp.error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode="contain" />
      </View>

      <KeyboardAvoidingView style={styles.formContainer}>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Name"
            autoCapitalize="none"
            nativeID="name"
            onChangeText={(text) => {
              nameRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            nativeID="email"
            onChangeText={(text) => {
              emailRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            nativeID="password"
            onChangeText={(text) => {
              passwordRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={handleSignUp} style={styles.submit}>
        <Text style={styles.submitText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Vertical Divider */}
      <View style={styles.divider}>
        <Text style={styles.dividerText}>OR</Text>
      </View>

      <Text
        style={{
          fontSize: SIZES.large,
        }}
      >
        Sign in with
      </Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            promptAsyncGoogle();
          }}
          style={styles.iconBtn}
        >
          <AntDesign name="google" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            promptAsyncFacebook();
          }}
          style={styles.iconBtn}
        >
          <FontAwesome5 name="facebook" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: SIZES.large,
        }}
      >
        Already have an account?{' '}
        <Link href="/sign-in" style={styles.link}>
          Log In
        </Link>
      </Text>
    </View>
  );
};

export default SignUp;
