import { Stack } from 'expo-router';

import { Palette } from '../../src/constants';

const Layout = () => {
  return (
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
  );
};

export default Layout;
