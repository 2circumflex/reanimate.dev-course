import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

const App = () => {
  const skPath = useSharedValue(Skia.Path.Make());

  const pan = Gesture.Pan()
    .onBegin(({ x, y }) => {
      skPath.value.moveTo(x, y);
    })
    .onUpdate(({ x, y }) => {
      skPath.value.lineTo(x, y);
      skPath.value = Skia.Path.MakeFromSVGString(skPath.value.toSVGString()!)!;
    });

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
