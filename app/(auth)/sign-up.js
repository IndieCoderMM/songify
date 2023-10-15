import {
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { appSignUp } from '../../store/auth';

import styles from '../../styles/auth.style';
import { SIZES } from '../../constants/theme';
import { Logo, GoogleLogo, FacebookLogo } from '../../constants/images';

const SignUp = () => {
  const router = useRouter();
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

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
      router.replace('/(routes)/home');
    } else {
      console.log(resp.error);
      Alert.alert('Sign Up Error', resp.error?.message);
    }
  };

  const gotoSignIn = () => {
    router.push('/sign-in');
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
        <TouchableOpacity onPress={handleSignUp} style={styles.iconBtn}>
          <Image source={GoogleLogo} width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={styles.iconBtn}>
          <Image source={FacebookLogo} width={30} height={30} />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: SIZES.large,
        }}
      >
        Already have an account?{' '}
        <Text onPress={gotoSignIn} style={styles.link}>
          Log In
        </Text>
      </Text>
    </View>
  );
};

export default SignUp;
