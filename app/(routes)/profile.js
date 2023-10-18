import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import AuthStore from '../../store/auth';
import { COLORS, SIZES } from '../../constants/theme';
import PlayerStore from '../../store/player';
import MusicFeed from '../../components/home/MusicFeed';
import { useRouter } from 'expo-router';

const Profile = () => {
  const { user, isLoggedIn } = AuthStore.useState();
  const { songs } = PlayerStore.useState();
  const router = useRouter();

  if (!isLoggedIn) {
    router.replace('/sign-in');
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
                borderWidth: 2,
                borderColor: COLORS.white,
              }}
            />
          ) : (
            <FontAwesome5 name="user" size={50} color={COLORS.darkGreen} />
          )}
        </View>
        <View>
          <Text style={styles.text}>{user.name}</Text>
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
          <Text style={styles.infoText}>{songs.length}</Text>
          <Text style={styles.infoTitle}>Songs Listened</Text>
        </View>
        <View style={styles.infoTile}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="favorite" size={40} color={COLORS.darkGreen} />
          </View>
          <Text style={styles.infoText}>{user.favorites?.length || 0}</Text>
          <Text style={styles.infoTitle}>
            {user.favorites?.length === 1 ? 'Favorite' : 'Favorites'}
          </Text>
        </View>
        <View style={styles.infoTile}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="queue-music"
              size={40}
              color={COLORS.darkGreen}
            />
          </View>
          <Text style={styles.infoText}>{user.playlists?.length || 0}</Text>
          <Text style={styles.infoTitle}>Playlists</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 20,
          marginVertical: 10,
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

      <MusicFeed data={songs.slice(0, 8)} />
    </SafeAreaView>
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
    width: '95%',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lighterGreen,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
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
    flex: 1,
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
