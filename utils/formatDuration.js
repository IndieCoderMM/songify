// Description: Format duration in seconds to a human readable music duration.
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = (seconds % 60).toFixed(0);
  return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
};

export default formatDuration;
