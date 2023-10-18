import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { View } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const Layout = () => {
  const screenOptions = {
    tabBarStyle: {
      backgroundColor: COLORS.white,
      borderTopRightRadius: SIZES.large,
      borderTopLeftRadius: SIZES.large,
      height: 80,
      paddingBottom: 10,
    },
    headerShown: false,
    tabBarActiveTintColor: COLORS.lightGreen,
  };
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: COLORS.darkGreen,
      }}
    >
      <Tabs screenOptions={screenOptions} initialRouteName="home">
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="home"
                size={55}
                color={focused ? COLORS.lightGreen : COLORS.darkGreen}
              />
            ),
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tabs.Screen
          name="favourites"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="heart"
                size={45}
                color={focused ? COLORS.lightGreen : COLORS.darkGreen}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="player"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'relative',
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                  backgroundColor: focused
                    ? COLORS.lightGreen
                    : COLORS.darkGreen,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesome5
                  name="play"
                  size={45}
                  color={COLORS.white}
                  style={{
                    transform: [{ translateX: 4 }],
                  }}
                />
              </View>
            ),
            tabBarShowLabel: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="user-circle"
                size={48}
                color={focused ? COLORS.lightGreen : COLORS.darkGreen}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="cog"
                size={50}
                color={focused ? COLORS.lightGreen : COLORS.darkGreen}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default Layout;
