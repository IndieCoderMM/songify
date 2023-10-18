import {
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import AuthStore, { appSignIn } from '../../store/auth';
import { Link, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

import styles from '../../styles/auth.style';
import { SIZES } from '../../constants/theme';
import { Logo } from '../../constants/images';

const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const { isLoggedIn } = AuthStore.useState();

  const handleSignIn = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    if (!email || !password) {
      Alert.alert('Cannot Sign In', 'Please fill in all fields');
      return;
    }

    const resp = await appSignIn(email, password);
    if (resp.user) {
      router.replace('/home');
    } else {
      console.log(resp.error);
      Alert.alert('Login Error', resp.error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode="contain" />
      </View>

      <KeyboardAvoidingView style={styles.formContainer}>
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
      <TouchableOpacity onPress={handleSignIn} style={styles.submit}>
        <Text style={styles.submitText}>Log In</Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: SIZES.large,
          marginVertical: 10,
        }}
      >
        No Account?{' '}
        <Link href="/sign-up" style={styles.link}>
          Sign Up
        </Link>
      </Text>
      <Link href="/forgot-password" style={{ fontSize: SIZES.large }}>
        Forgot Password?
      </Link>
    </View>
  );
};

export default SignIn;
