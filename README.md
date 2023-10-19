<details> 
  <summary>Table of Contents</summary>

- [Songify](#songify)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Development](#development)
  - [Getting Started](#getting-started)
  - [Future Features](#future-features)
  - [Contact](#contact)
  - [License](#license)

</details>

# Songify
[![Version](https://img.shields.io/github/package-json/v/indiecodermm/songify)](https://github.com/indiecodermm/songify)
[![License](https://img.shields.io/github/license/indiecodermm/songify)](https://github.com/indiecodermm/songify/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/indiecodermm/songify)](https://github.com/indiecodermm/songify/commits)

**Songify** is a feature-rich Spotify Clone that allows users to play music, search for songs, and create their favorite playlists. Songify is built with React Native and Expo, and utilizes the Deezer API to fetch songs data.

## Technologies Used

- React Native
- Firebase: Authentication and Firestore
- [Expo Router](https://expo.github.io/router/docs): File-based routing for Native apps
- [Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/): Auth Provider for Google and Facebook
- [Expo Av](https://docs.expo.dev/versions/latest/sdk/av/): For playing audio
- [RN Async Storage](https://github.com/react-native-async-storage/async-storage): Local storage for user data
- [Pullstate](https://lostpebble.github.io/pullstate/): Lightweight global state management 
- [Deezer API](https://rapidapi.com/deezerdevs/api/deezer-1): Fetch songs data

## Features

- Secure user authentication
- Login with Google or Facebook
- Play songs with interactive player
- Search and filter for songs
- Add songs to favorites
- Spotify-like UI
- Intuitive tab navigation

## Development

This app was developed using the latest technologies and best practices. The codebase is highly modularized and organized for easy maintenance and scalability.

<details> 
  <summary>Project Structure</summary>

With a focus on clean code and maintainability, the project structure is organized into the following folders:

```py
.
├── app/
│   ├── (auth)/     # Authentication screens
│   │   ├── sign-up.js
│   │   └── ...
│   ├── (routes)/   # Main app screens
│   │   ├── home.js
│   │   ├── player.js
│   │   └── ...
│   ├── _layout.js
│   └── index.js
├── assets
├── components/     # Reusable components grouped by page
│   ├── home
│   ├── player
│   └── index.js
├── constants
├── hooks
├── store/          # Global state management
│   ├── auth.js
│   └── player.js
├── styles          # Reusable styles
├── utils
├── index.js
└── firebase-config.js

```

</details>

## Getting Started

To run this project locally, follow these steps:

1. Clone the repo
   
```sh
git clone git@github.com:IndieCoderMM/songify.git
```

2. Install dependencies

```sh
npm install
```

3. Start the Expo server

```sh
npx expo start
```

*Expo-CLI will start a server and generate a QR code. You can scan this code to run the app on your mobile device. Alternatively, you can run the app on an emulator.*

## Future Features

The following features are planned for future updates:

- [ ] Create playlists
- [ ] Add songs to playlists
- [ ] Background audio playback
- [ ] Play songs in shuffle/repeat mode
- [ ] Play local songs


## Contact

I am always looking for ways to improve my project. If you have any suggestions or ideas, I would love to hear from you.

[![Github](https://img.shields.io/badge/GitHub-673AB7?style=for-the-badge&logo=github&logoColor=white)](https://github.com/IndieCoderMM)
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hthantoo)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hthant00chk@gmail.com)

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for more information.