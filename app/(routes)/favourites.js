import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { COLORS, SIZES } from '../../constants/theme';
import { useEffect } from 'react';
import PlayerStore, { fetchAllSongs } from '../../store/player';
import QueryStore from '../../store/query';
import { MusicFeed } from '../../components';

const Favourite = () => {
  const { isActive, songs: allSongs } = PlayerStore.useState();
  const { query } = QueryStore.useState();
  const router = useRouter();

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs(query);
    }
  }, [isActive]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourite Songs</Text>
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
          <Text style={styles.text}>{allSongs.length} Tracks</Text>
        </View>
      </View>
      <MusicFeed data={allSongs} />
    </View>
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
