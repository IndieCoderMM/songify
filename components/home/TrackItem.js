import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS, SIZES } from '../../constants/theme';
import formatDuration from '../../utils/formatDuration';
import { setCurrentSong, setIsPlaying } from '../../store/player';

const TrackItem = ({ albumCover, title, artist, duration, index }) => {
  const router = useRouter();

  const playMusic = () => {
    setIsPlaying(false);
    setCurrentSong(index);

    router.push('/player');
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginVertical: 5,
      }}
    >
      <Pressable style={styles.container} onPress={playMusic}>
        <View>
          <Image
            src={albumCover}
            resizeMode="contain"
            style={styles.albumCover}
          />
        </View>
        <View style={styles.trackInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
        {/* TODO Add slider component */}
        <View style={styles.duration}>
          <Text style={styles.durationText}>{formatDuration(duration)}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.darkGreen,
    paddingBottom: 10,
    borderBottomColor: COLORS.green,
    borderBottomWidth: 1,
  },
  albumCover: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  trackInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'semibold',
    paddingRight: 8,
  },
  artist: {
    color: COLORS.white,
    opacity: 0.8,
    fontSize: SIZES.medium,
  },
  duration: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});

export default TrackItem;
