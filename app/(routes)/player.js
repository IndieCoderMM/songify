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
import { Audio } from 'expo-av';

import { Heart2Icon, XIcon } from '../../constants/images';
import { Controls, ProgressBar } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import PlayerStore, {
  fetchAllSongs,
  gotoNextSong,
  gotoPreviousSong,
  setIsPlaying,
} from '../../store/player';

const Player = () => {
  const router = useRouter();
  const {
    isActive,
    isPlaying,
    currentSongMetadata: currentSong,
    currentAudio,
  } = PlayerStore.useState();
  const [currentSound, setCurrentSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs('taylor swift');
    }
  }, []);

  useEffect(() => {
    if (currentAudio) {
      play({ uri: currentAudio });
    }
  }, [currentAudio]);

  const play = async ({ uri }) => {
    if (currentSound) {
      return;
    }
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri,
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
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
    }
    if (status.didJustFinish) {
      setCurrentSound(null);
      await playNextTrack();
    }
  };

  const playNextTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      setCurrentSound(null);
    }

    gotoNextSong();
  };

  const playPrevTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      setCurrentSound(null);
    }

    gotoPreviousSong();
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      await currentSound.pauseAsync();
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
      <ProgressBar currentTime={currentTime} duration={duration} />
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
