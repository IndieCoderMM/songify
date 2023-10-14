import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import formatDuration from '../../utils/formatDuration';

const TrackItem = ({ albumCover, title, artist, duration }) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginVertical: 5,
      }}
    >
      <View style={styles.container}>
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
        <View style={styles.duration}>
          <Text style={styles.durationText}>{formatDuration(duration)}</Text>
        </View>
      </View>
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
