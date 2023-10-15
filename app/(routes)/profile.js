import { View, Text, StyleSheet, Image } from 'react-native';
import AuthStore from '../../store/auth';
import { COLORS, SIZES } from '../../constants/theme';
import { UserIcon } from '../../constants/images';

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
      <View style={styles.imageContainer}>
        <Image
          source={user.photoURL ? { uri: user.photoURL } : UserIcon}
          resizeMode="contain"
          width={100}
          height={100}
        />
      </View>
      <Text style={styles.text}>{user.displayName}</Text>
      <Text style={styles.smallText}>{user.email}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoTile}>
          <Text style={styles.infoText}>156</Text>
          <Text style={styles.infoTitle}>Songs Listened</Text>
        </View>
        <View style={styles.infoTile}>
          <Text style={styles.infoText}>34</Text>
          <Text style={styles.infoTitle}>Favourites</Text>
        </View>
        <View style={styles.infoTile}>
          <Text style={styles.infoText}>15</Text>
          <Text style={styles.infoTitle}>Followers</Text>
        </View>
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
  text: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 30,
  },
  infoTile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '30%',
    height: 100,
    borderRadius: 10,
  },
  infoText: {
    color: COLORS.darkGreen,
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoTitle: {
    color: COLORS.darkGreen,
    fontSize: SIZES.small,
    fontWeight: 'medium',
    textAlign: 'center',
  },
});

export default Profile;
