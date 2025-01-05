import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { TransitionsProvider } from '../src/provider/transitions-provider';

export default function Layout() {
  return (
    <TransitionsProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </TransitionsProvider>
  );
}
