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
import { AntDesign } from '@expo/vector-icons';

import { Controls, ProgressBar } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import PlayerStore, {
  fetchAllSongs,
  gotoNextSong,
  gotoPreviousSong,
  setIsPlaying,
} from '../../store/player';
import QueryStore from '../../store/query';
import AuthStore from '../../store/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { usersRef } from '../../firebase-config';

const Player = () => {
  const router = useRouter();
  const {
    isActive,
    isPlaying,
    currentAudio,
    currentSongMetadata: currentSong,
  } = PlayerStore.useState();
  const { user } = AuthStore.useState();
  const { query } = QueryStore.useState();

  const [currentSound, setCurrentSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.includes(currentSong.id),
  );

  useEffect(() => {
    if (!isActive) {
      fetchAllSongs(query);
    }

    const unsub = PlayerStore.subscribe(
      (s) => s.currentAudio,
      async (newAudio) => {
        await play({ uri: newAudio });
      },
    );

    play({ uri: currentAudio });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    return currentSound
      ? () => {
          currentSound.unloadAsync();
        }
      : undefined;
  }, [currentSound]);

  useEffect(() => {
    setIsFavorite(user.favorites?.includes(currentSong.id));
  }, [user.favorites, currentSong]);

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

  const handleSeek = async (valueInSeconds) => {
    if (!currentSound) {
      return;
    }

    await currentSound.playFromPositionAsync(valueInSeconds * 1000);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      const newFavorites = user.favorites.filter((id) => id !== currentSong.id);
      await updateDoc(doc(usersRef, user.uid), {
        favorites: newFavorites,
      });
      AuthStore.update((store) => {
        store.user.favorites = newFavorites;
      });
      setIsFavorite(false);
    } else {
      const newFavorites = [...user.favorites, currentSong.id];
      await updateDoc(doc(usersRef, user.uid), {
        favorites: newFavorites,
      });
      AuthStore.update((store) => {
        store.user.favorites = newFavorites;
      });
      setIsFavorite(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="close" size={40} color={COLORS.lightGreen} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Music</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          {isFavorite ? (
            <AntDesign name="heart" size={40} color={COLORS.lightGreen} />
          ) : (
            <AntDesign name="hearto" size={40} color={COLORS.lightGreen} />
          )}
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
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        handleSeek={handleSeek}
      />
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
