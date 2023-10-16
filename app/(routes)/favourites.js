import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { useEffect } from 'react';
import PlayerStore, { fetchAllSongs } from '../../store/player';
import QueryStore from '../../store/query';
import { MusicFeed } from '../../components';

const Favourite = () => {
  const { isActive, songs: allSongs } = PlayerStore.useState();
  const { query } = QueryStore.useState();

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs(query);
    }
  }, [isActive]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites ({allSongs.length})</Text>
      <MusicFeed data={allSongs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
  },
  title: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    textAlign: 'center',
    marginVertical: 20,
  },
});
export default Favourite;
