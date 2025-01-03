import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import { Canvas } from '@shopify/react-native-skia';

const App = () => {
  const { width: windowWidth } = useWindowDimensions();
  const canvasHeight = 600;
  const canvasWidth = windowWidth * 0.95;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Slider
        style={styles.slider}
        minimumTrackTintColor="#fff"
        // onValueChange={value => console.log(value)}
      />
      <Canvas
        style={[
          {
            height: canvasHeight,
            width: canvasWidth,
          },
          styles.canvas,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slider: {
    width: '95%',
    marginTop: 60,
    alignSelf: 'center',
  },
  canvas: {
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 25,
  },
});

export { App };
