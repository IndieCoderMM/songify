import { Store, registerInDevtools } from 'pullstate';
import axios from 'axios';

const PlayerStore = new Store({
  allSongs: [],
  isPlaying: false,
  currentIndex: null,
  currentSong: null,
  currentSound: null,
  isActive: false,
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
      store.allSongs = data;
      store.isActive = true;
      store.currentIndex = 0;
    });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentSound = (sound) => {
  PlayerStore.update((store) => {
    store.currentSound = sound;
  });
};

export const activatePlayer = (data) => {
  PlayerStore.update((store) => {
    store.allSongs = data;
    store.isActive = true;
    store.currentIndex = 0;
  });
};

export const updateCurrentSong = () => {
  PlayerStore.update((store) => {
    store.currentSong = store.allSongs[store.currentIndex];
  });
};

export const setCurrentSong = (index) => {
  PlayerStore.update((store) => {
    store.currentIndex = index;
  });
};

export const setIsPlaying = (isPlaying) => {
  PlayerStore.update((store) => {
    store.isPlaying = isPlaying;
  });
};

export const goToNext = () => {
  PlayerStore.update((store) => {
    if (store.currentIndex === store.allSongs.length - 1) {
      store.currentIndex = 0;
      return;
    }
    store.currentIndex = store.currentIndex + 1;
  });
};

export const goToPrev = () => {
  PlayerStore.update((store) => {
    if (store.currentIndex === 0) {
      store.currentIndex = store.allSongs.length - 1;
      return;
    }
    store.currentIndex = store.currentIndex - 1;
  });
};

registerInDevtools({
  PlayerStore,
});

export default PlayerStore;
