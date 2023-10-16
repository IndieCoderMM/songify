import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { Carousel, MusicFeed } from '../../components';
import { BellIcon, FilterIcon, Logo, SearchIcon } from '../../constants/images';
import { COLORS, SIZES } from '../../constants/theme';
import PlayerStore, { fetchAllSongs } from '../../store/player';
import { useEffect } from 'react';
import QueryStore from '../../store/query';

const Home = () => {
  const { isActive, songs: allSongs } = PlayerStore.useState();
  const { query } = QueryStore.useState();

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs(query);
    }
  }, [isActive]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode="contain" style={{ height: 80 }} />
        <Image source={BellIcon} resizeMode="contain" style={styles.bell} />
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
    position: 'relative',
  },
  bell: {
    position: 'absolute',
    right: 10,
    top: 30,
    width: 30,
    height: 30,
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
