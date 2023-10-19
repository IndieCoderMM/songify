import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS, SIZES } from '../../constants/theme';
import { appSignOut } from '../../store/auth';

const Settings = () => {
  const router = useRouter();
  const handleSignOut = () => {
    appSignOut();
    router.replace('/sign-in');
    Alert.alert('Logged Out', 'You have been logged out');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.darkGreen,
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontSize: SIZES.xLarge,
          fontWeight: 'bold',
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        Settings
      </Text>
      <Text style={styles.groupTitle}>Account</Text>
      <View style={styles.group}>
        <TouchableOpacity style={styles.groupItem}>
          <Text style={styles.text}>Update Profile</Text>
          <FontAwesome name="angle-right" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupItem}>
          <Text style={styles.text}>Change Password</Text>
          <FontAwesome name="angle-right" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <Text style={styles.groupTitle}>App</Text>
      <View style={styles.group}>
        <TouchableOpacity style={styles.groupItem}>
          <Text style={styles.text}>About</Text>
          <FontAwesome name="angle-right" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupItem}>
          <Text style={styles.text}>Help</Text>
          <FontAwesome name="angle-right" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupItem}>
          <Text style={styles.text}>Report a Bug</Text>
          <FontAwesome name="angle-right" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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

const styles = StyleSheet.create({
  group: {
    backgroundColor: COLORS.lighterGreen,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  groupTitle: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'semibold',
    marginBottom: 10,
  },
  groupItem: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});

export default Settings;
