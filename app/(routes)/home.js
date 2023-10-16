import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { Carousel, MusicFeed } from '../../components';
import { FilterIcon, Logo, SearchIcon } from '../../constants/images';
import { COLORS, SIZES } from '../../constants/theme';
import PlayerStore, { fetchAllSongs } from '../../store/player';
import { useEffect } from 'react';

const Home = () => {
  // TODO: Display data from useFetch
  const { isActive, songs: allSongs } = PlayerStore.useState();

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs('taylor swift');
    }
  }, [isActive]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode="contain" style={{ height: 80 }} />
      </View>
      <Carousel />
      <View style={styles.actionContainer}>
        <View style={styles.searchContainer}>
          <Image
            source={SearchIcon}
            resizeMode="contain"
            width={30}
            height={30}
          />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={FilterIcon}
            resizeMode="contain"
            width={30}
            height={30}
          />
        </TouchableOpacity>
      </View>

      <MusicFeed data={allSongs} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchContainer: {
    display: 'flex',
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 9,
    backgroundColor: COLORS.lighterGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: SIZES.medium,
    color: COLORS.white,
    width: '80%',
  },
  filterButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: 44,
    height: 44,
    borderRadius: 7,
  },
});

export default Home;
