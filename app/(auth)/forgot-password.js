import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/theme';
import { Lock } from '../../constants/images';

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Lock} resizeMode="contain" />
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 16,
            textAlign: 'center',
            paddingHorizontal: 20,
          }}
        >
          Don't worry! We'll help you recover your account.
        </Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Contact Us</Text>
      </TouchableOpacity>

      <View>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 15,
            textAlign: 'center',
            marginBottom: 5,
          }}
        >
          @CopyRight &copy; Spotify
        </Text>
        <Text
          style={{ color: COLORS.white, fontSize: 15, textAlign: 'center' }}
        >
          All rights reserved
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
  },
  imageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: COLORS.darkGreen,
  },
  group: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  btn: {
    width: 300,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    marginBottom: 10,
  },
  btnText: {
    color: COLORS.darkGreen,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
