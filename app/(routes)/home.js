import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Carousel, MusicFeed } from '../../components';
import { FilterIcon, Logo, SearchIcon } from '../../constants/images';
import { COLORS, SIZES } from '../../constants/theme';
import PlayerStore, { fetchAllSongs } from '../../store/player';
import { useEffect, useState } from 'react';
import QueryStore, { setSearch } from '../../store/query';
import useDebounce from '../../hooks/useDebounce';

const Home = () => {
  const { isActive, songs: allSongs } = PlayerStore.useState();
  const { query, search } = QueryStore.useState();
  const [inputText, setInputText] = useState('');
  const debouncedSearch = useDebounce(inputText, 100);

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs(query);
    }
  }, [isActive]);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  const handleSearch = (text) => {
    setInputText(text);
  };

  const searchResults = allSongs.filter((song) => {
    return song.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode="contain" style={{ height: 80 }} />
        <FontAwesome
          name="bell"
          size={30}
          color={COLORS.white}
          style={styles.bell}
        />
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
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={inputText}
          />
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
      {search.length > 0 && searchResults.length === 0 && (
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: COLORS.white }}>
            No results found for "{search}"
          </Text>
        </View>
      )}
      <MusicFeed data={search ? searchResults : allSongs} />
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
