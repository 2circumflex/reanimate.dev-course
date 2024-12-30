import { Dimensions, StyleSheet } from 'react-native';
import { Group, rect, Rect } from '@shopify/react-native-skia';
import Touchable, { useGestureHandler } from 'react-native-skia-gesture';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');

const SquareSize = 100;

const App = () => {
  const translateX = useSharedValue(ScreenWidth / 2 - SquareSize / 2);
  const translateY = useSharedValue(ScreenHeight / 2 - SquareSize / 2);

  const context = useSharedValue({
    x: 0,
    y: 0,
  });

  const isDragging = useSharedValue(false);

  const panGesture = useGestureHandler({
    onStart: () => {
      'worklet';
      isDragging.value = true;
      context.value = {
        x: translateX.value,
        y: translateY.value,
      };
    },
    onActive: ({ translationX, translationY }) => {
      'worklet';
      translateX.value = translationX + context.value.x;
      translateY.value = translationY + context.value.y;
    },
    onEnd: () => {
      'worklet';
      isDragging.value = false;
    },
  });

  const scale = useDerivedValue(() => {
    return withTiming(isDragging.value ? 1.2 : 1);
  }, []);

  const rotate = useDerivedValue(() => {
    return withTiming(isDragging.value ? Math.PI / 4 : 0);
  }, []);

  const transform = useDerivedValue(() => {
    return [{ rotate: rotate.value }, { scale: scale.value }];
  }, []);

  const origin = useDerivedValue(() => {
    return {
      x: translateX.value + SquareSize / 2,
      y: translateY.value + SquareSize / 2,
    };
  }, []);

  return (
    <Touchable.Canvas style={styles.container}>
      <Rect rect={rect(0, 0, ScreenWidth, ScreenHeight / 2)} color={'white'} />
      <Rect
        rect={rect(0, ScreenHeight / 2, ScreenWidth, ScreenHeight / 2)}
        color={'black'}
      />
      <Group transform={transform} origin={origin}>
        <Touchable.RoundedRect
          x={translateX}
          y={translateY}
          width={SquareSize}
          height={SquareSize}
          r={30}
          color={'#0092e7'}
          {...panGesture}
        />
      </Group>
    </Touchable.Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { App };
