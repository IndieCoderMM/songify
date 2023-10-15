import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Heart2Icon, XIcon } from '../../constants/images';
import data from '../../constants/sampleData';
import { Controls } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import PlayerStore, {
  activatePlayer,
  nextSong,
  prevSong,
  setAllSongs,
  setIsPlaying,
} from '../../store/player';

const Player = () => {
  const router = useRouter();

  const player = PlayerStore.useState();
  const currentSong = player.currentSong;

  useEffect(() => {
    if (player.isActive) {
      return;
    }
    setAllSongs(data);
    activatePlayer();
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!player.isPlaying);
  };

  const handleNext = () => {
    nextSong();
  };

  const handlePrev = () => {
    prevSong();
  };

  const addToFavorites = () => {
    console.log('Add to favorites');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={XIcon}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Music</Text>
        <TouchableOpacity onPress={addToFavorites}>
          <Image
            source={Heart2Icon}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Image
        src={currentSong?.album.cover_medium}
        resizeMode="contain"
        style={styles.cover}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{currentSong?.title}</Text>
        <Text style={styles.artist}>{currentSong?.artist.name}</Text>
      </View>

      <Controls
        isPlaying={player.isPlaying}
        handlePlayPause={handlePlayPause}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    opacity: 0.8,
  },
  cover: {
    width: 300,
    height: 300,
    borderRadius: SIZES.xLarge,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lighterGreen,
    marginVertical: 20,
  },
  detailsContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  artist: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    opacity: 0.8,
  },
});

export default Player;
