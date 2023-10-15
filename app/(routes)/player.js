import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Heart2Icon, XIcon } from '../../constants/images';
import { Controls } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import PlayerStore, {
  goToNext,
  goToPrev,
  updateCurrentSong,
  setCurrentSound,
  setIsPlaying,
  fetchAllSongs,
} from '../../store/player';
import { Audio } from 'expo-av';

const Player = () => {
  const router = useRouter();
  const { isActive, isPlaying, currentSong, currentSound, currentIndex } =
    PlayerStore.useState();
  const [progress, setProgress] = useState(null);
  // TODO: Add progress to store

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs('taylor swift');
    }
    updateCurrentSong();
  }, []);

  useEffect(() => {
    updateCurrentSong();
  }, [currentIndex]);

  const play = async () => {
    try {
      if (currentSound) {
        currentSound.setOnPlaybackStatusUpdate(null);
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: currentSong.preview,
        },
        {
          shouldPlay: true,
          isLooping: false,
        },
        onPlaybackStatusUpdate,
      );

      onPlaybackStatusUpdate(status);
      setCurrentSound(sound);
      setIsPlaying(status.isLoaded);

      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded && status.isPlaying) {
      const progress = status.positionMillis / status.durationMillis;
      setProgress(progress);
    }
    if (status.didJustFinish) {
      setCurrentSound(null);
      await playNextTrack();
    }
  };

  const playNextTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }

    goToNext();
    await play();
  };

  const playPrevTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }

    goToPrev();
    await play();
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      await currentSound.pauseAsync();
      return;
    }
    if (!currentSound) {
      await play();
      return;
    }
    await currentSound.playAsync();
    setIsPlaying(true);
  };

  const addToFavorites = () => {
    // TODO: Add to favorites
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
      {isActive ? (
        <Controls
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          handleNext={playNextTrack}
          handlePrev={playPrevTrack}
        />
      ) : (
        <ActivityIndicator size="large" color={COLORS.white} />
      )}
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
