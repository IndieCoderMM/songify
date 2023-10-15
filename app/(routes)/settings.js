import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { appSignOut } from '../../store/auth';
import { useRouter } from 'expo-router';

const Settings = () => {
  const router = useRouter();
  const handleSignOut = () => {
    appSignOut();
    router.push('/sign-in');
    Alert.alert('Logged Out', 'You have been logged out');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.darkGreen,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontSize: SIZES.xLarge,
          fontWeight: 'bold',
          marginVertical: 50,
        }}
      >
        Settings
      </Text>
      <View style={{}}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            backgroundColor: COLORS.danger,
            width: 150,
            paddingVertical: 20,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.large,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
