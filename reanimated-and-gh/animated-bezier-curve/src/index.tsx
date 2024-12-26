import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Canvas, Circle } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { InitialPoints } from './constants';

type Point = {
  x: number;
  y: number;
};

const useSharedControlPoint = (initialPoint: Point) => {
  const controlPoint = useSharedValue(initialPoint);
  const cx = useDerivedValue(() => {
    return controlPoint.value.x;
  });

  const cy = useDerivedValue(() => {
    return controlPoint.value.y;
  });

  return { controlPoint, cx, cy };
};

const App = () => {
  const first = useSharedControlPoint(InitialPoints.first);
  const second = useSharedControlPoint(InitialPoints.second);
  const third = useSharedControlPoint(InitialPoints.third);
  const fourth = useSharedControlPoint(InitialPoints.fourth);
  const controlPoints = [first, second, third, fourth];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Canvas
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        {controlPoints.map(({ cx, cy }, index) => (
          <Circle
            key={index}
            cx={cx}
            cy={cy}
            r={12}
            color={'white'}
            strokeWidth={2}
            style={'stroke'}
          />
        ))}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { App };
