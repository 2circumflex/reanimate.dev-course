import { Stack } from 'expo-router';

// eslint-disable-next-line import/no-default-export
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
