import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import formatDuration from '../../utils/formatDuration';
import PlayerStore, {
  activatePlayer,
  setCurrentSong,
} from '../../store/player';
import data from '../../constants/sampleData';
import { useRouter } from 'expo-router';

const TrackItem = ({ albumCover, title, artist, duration, index }) => {
  const player = PlayerStore.useState();
  const router = useRouter();

  const playMusic = () => {
    if (!player.isActive) {
      activatePlayer(data);
    }
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
          <Text style={styles.title}>{title}</Text>
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
