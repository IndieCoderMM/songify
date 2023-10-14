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

const Home = () => {
  // TODO: Display data from useFetch

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode="contain" style={{ height: 100 }} />
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

      <MusicFeed />
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
    paddingVertical: 10,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
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
