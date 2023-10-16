import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import formatDuration from '../../utils/formatDuration';

const ProgressBar = ({ currentTime, duration }) => {
  // const handleSeek = (value) => {
  //   PlayerStore.update((s) => {
  //     s.currentTime = value;
  //   });
  // };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        minimumTrackTintColor={COLORS.white}
        maximumTrackTintColor={COLORS.white}
        thumbTintColor={COLORS.lightGreen}
        disabled
      />
      <Text style={styles.time}>{formatDuration(currentTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  time: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    paddingHorizontal: 5,
  },
  slider: {
    flex: 1,
  },
});

export default ProgressBar;
