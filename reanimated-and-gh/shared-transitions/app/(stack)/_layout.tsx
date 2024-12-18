import { Stack } from 'expo-router';

import { Palette } from '../../src/constants';

const Layout = () => {
  return (
    <Stack>
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
    </Stack>
  );
};

export default Layout;
