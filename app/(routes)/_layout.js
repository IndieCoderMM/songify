import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  HeartIcon,
  HomeIcon,
  PlayIcon,
  SettingIcon,
  UserIcon,
} from '../../constants/images';
import { Image, View } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const TabIcon = ({ focused, icon }) => {
  return (
    <Image
      source={icon}
      resizeMode="contain"
      style={{
        tintColor: focused ? COLORS.lightGreen : COLORS.darkGreen,
        borderWidth: icon === PlayIcon ? 2 : 0,
        borderColor: COLORS.white,
        borderRadius: icon === PlayIcon ? 50 : 0,
      }}
    />
  );
};

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
              <TabIcon focused={focused} icon={HomeIcon} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="favourites"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={HeartIcon} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="player"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={PlayIcon} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={UserIcon} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={SettingIcon} />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default Layout;
