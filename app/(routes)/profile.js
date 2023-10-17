import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import AuthStore from '../../store/auth';
import { COLORS, SIZES } from '../../constants/theme';
const Profile = () => {
  const { user, isLoggedIn } = AuthStore.useState();
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please login to view your profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          {user.photoURL ? (
            <Image
              source={user.photoURL}
              resizeMode="contain"
              width={100}
              height={100}
            />
          ) : (
            <FontAwesome5 name="user" size={50} color={COLORS.darkGreen} />
          )}
        </View>
        <View>
          <Text style={styles.text}>{user.displayName}</Text>
          <Text style={styles.smallText}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoTile}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="headset-mic"
              size={40}
              color={COLORS.darkGreen}
            />
          </View>
          <Text style={styles.infoText}>156</Text>
          <Text style={styles.infoTitle}>Songs Listened</Text>
        </View>
        <View style={styles.infoTile}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="favorite" size={40} color={COLORS.darkGreen} />
          </View>
          <Text style={styles.infoText}>34</Text>
          <Text style={styles.infoTitle}>Favourites</Text>
        </View>
        <View style={styles.infoTile}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="queue-music"
              size={40}
              color={COLORS.darkGreen}
            />
          </View>
          <Text style={styles.infoText}>15</Text>
          <Text style={styles.infoTitle}>Playlists</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 20,
          marginVertical: 30,
        }}
      >
        <FontAwesome5
          name="clock"
          size={25}
          color={COLORS.white}
          style={{
            marginRight: 10,
            opacity: 0.9,
          }}
        />
        <Text style={styles.text}>Recent Songs</Text>
      </View>

      <View>
        <Text style={styles.smallText}>Empty! No recent songs to show</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  smallText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 20,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lighterGreen,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLORS.lightGreen,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoTitle: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: 'medium',
    textAlign: 'center',
  },
});

export default Profile;
