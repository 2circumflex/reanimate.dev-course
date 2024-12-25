import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Canvas, Path } from '@shopify/react-native-skia';
import { GestureDetector } from 'react-native-gesture-handler';

import { useDrawGesture } from './hooks/useDrawGesture';

const App = () => {
  const { pan, pathOpacity, skPath } = useDrawGesture();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GestureDetector gesture={pan}>
        <Canvas style={{ flex: 1, backgroundColor: 'black' }}>
          <Path
            path={skPath}
            color={'white'}
            style={'stroke'}
            strokeWidth={2}
            opacity={pathOpacity}
          />
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export { App };
