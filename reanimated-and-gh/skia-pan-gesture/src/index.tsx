import { Dimensions, StyleSheet } from 'react-native';
import { Canvas, rect, Rect, RoundedRect } from '@shopify/react-native-skia';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');

const SquareSize = 100;

const App = () => {
  return (
    <Canvas style={styles.container}>
      <Rect rect={rect(0, 0, ScreenWidth, ScreenHeight / 2)} color={'white'} />
      <Rect
        rect={rect(0, ScreenHeight / 2, ScreenWidth, ScreenHeight / 2)}
        color={'black'}
      />
      <RoundedRect
        x={ScreenWidth / 2 - SquareSize / 2}
        y={ScreenHeight / 2 - SquareSize / 2}
        width={SquareSize}
        height={SquareSize}
        r={30}
        color={'#0092e7'}
      />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { App };
