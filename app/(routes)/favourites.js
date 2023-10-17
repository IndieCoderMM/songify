import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { COLORS, SIZES } from '../../constants/theme';
import { useEffect } from 'react';
import PlayerStore, { fetchAllSongs } from '../../store/player';
import QueryStore from '../../store/query';
import { MusicFeed } from '../../components';
import AuthStore from '../../store/auth';

const Favourite = () => {
  const { isActive, songs: allSongs } = PlayerStore.useState();
  const { query } = QueryStore.useState();
  const { user } = AuthStore.useState();
  const router = useRouter();

  const favorites = allSongs.filter((song) =>
    user?.favorites?.includes(song.id),
  );

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs(query);
    }
  }, [isActive]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourites</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
      >
        <Pressable onPress={() => router.push('/player')}>
          <MaterialIcons
            name="play-circle-fill"
            size={60}
            color={COLORS.lightGreen}
          />
        </Pressable>
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.large,
            marginLeft: 5,
          }}
        >
          Play All
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          <MaterialIcons name="library-music" size={28} color={COLORS.white} />
          <Text style={styles.text}>
            {favorites.length} {favorites.length === 1 ? 'Track' : 'Tracks'}
          </Text>
        </View>
      </View>
      {favorites.length === 0 && (
        <Text style={{ color: COLORS.white, textAlign: 'center' }}>
          You have no favorite songs yet
        </Text>
      )}
      <MusicFeed data={favorites} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
  },
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    marginBottom: 10,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginLeft: 5,
  },
});
export default Favourite;
