import {
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AuthStore, appSignIn } from '../../store.js';
import { useRouter } from 'expo-router';
import Logo from '../../assets/logo.png';
import { useRef } from 'react';
import styles from '../../styles/authStyles.js';
import { SIZES } from '../../constants/Theme.js';

const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleSignIn = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    if (!email || !password) {
      Alert.alert('Cannot Sign In', 'Please fill in all fields');
      return;
    }

    const resp = await appSignIn(email, password);
    if (resp?.user) {
      router.replace('/(routes)/home');
    } else {
      console.log(resp.error);
      Alert.alert('Login Error', resp.error?.message);
    }
  };

  const gotoSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode="contain" />
      </View>

      <View style={styles.formContainer}>
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
      </View>
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
        <Text onPress={gotoSignUp} style={styles.link}>
          Sign Up
        </Text>
      </Text>
      <Text
        style={{ fontSize: SIZES.large }}
        onPress={() => {
          router.push('/(auth)/forgot-password');
        }}
      >
        Forgot Password?
      </Text>
    </View>
  );
};

export default SignIn;
