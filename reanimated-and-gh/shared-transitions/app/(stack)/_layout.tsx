import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Palette } from '../../src/constants';

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          presentation: 'containedTransparentModal',
          animation: 'fade',
        }}>
        <Stack.Screen
          name="home"
          options={{
            headerTitle: 'Home',
            headerBlurEffect: 'dark',
            headerTransparent: true,
            headerTitleStyle: {
              color: Palette.text,
            },
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default Layout;
