import { Store, registerInDevtools } from 'pullstate';
import axios from 'axios';

const PlayerStore = new Store({
  songs: [],
  isPlaying: false,
  isActive: false,
  index: null,
  currentSongMetadata: null,
  currentAudio: null,
});

export const fetchAllSongs = async (query) => {
  const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    params: { q: query },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.data.slice(0, 20);
    PlayerStore.update((store) => {
      store.songs = data;
      store.currentSongMetadata = data[0];
      store.currentAudio = data[0].preview;
      store.index = 0;
      store.isActive = true;
    });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentSong = (index) => {
  PlayerStore.update((store) => {
    if (store.songs.length === 0) return;
    store.index = index;
    store.currentSongMetadata = store.songs[index];
    store.currentAudio = store.songs[index].preview;
  });
};

export const gotoNextSong = () => {
  PlayerStore.update((store) => {
    if (store.songs.length === 0) return;
    if (store.index === store.songs.length - 1) {
      store.index = 0;
    } else {
      store.index += 1;
    }
  });

  setCurrentSong(PlayerStore.getRawState().index);
};

export const gotoPreviousSong = () => {
  PlayerStore.update((store) => {
    if (store.songs.length === 0) return;
    if (store.index === 0) {
      store.index = store.songs.length - 1;
    } else {
      store.index -= 1;
    }
  });
  setCurrentSong(PlayerStore.getRawState().index);
};

export const setIsPlaying = (isPlaying) => {
  PlayerStore.update((store) => {
    store.isPlaying = isPlaying;
  });
};

registerInDevtools({
  PlayerStore,
});

export default PlayerStore;
