import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import {
  Canvas,
  Fill,
  ImageShader,
  useImage,
} from '@shopify/react-native-skia';

const FIRST_IMAGE =
  'https://images.unsplash.com/photo-1596501048547-e9acb71ca798?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const SECOND_IMAGE =
  'https://images.unsplash.com/photo-1531168556467-80aace0d0144?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const App = () => {
  const { width: windowWidth } = useWindowDimensions();
  const canvasHeight = 600;
  const canvasWidth = windowWidth * 0.95;

  const firstImage = useImage(FIRST_IMAGE);
  const secondImage = useImage(SECOND_IMAGE);

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
        ]}>
        <Fill>
          <ImageShader
            image={firstImage}
            width={canvasHeight}
            height={canvasHeight}
            fit={'cover'}
          />
          <ImageShader
            image={secondImage}
            width={canvasHeight}
            height={canvasHeight}
            fit={'cover'}
          />
        </Fill>
      </Canvas>
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
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 25,
  },
});

export { App };
