import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
// eslint-disable-next-line import/no-extraneous-dependencies
import Touchable from 'react-native-skia-gesture';

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
      <Touchable.Canvas
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        {controlPoints.map(({ cx, cy, controlPoint }, index) => {
          const onUpdate = (event: { x: number; y: number }) => {
            'worklet';
            controlPoint.value = { x: event.x, y: event.y };
          };

          return (
            <Touchable.Circle
              key={index}
              cx={cx}
              cy={cy}
              onStart={onUpdate}
              onActive={onUpdate}
              r={12}
              color={'white'}
              strokeWidth={2}
              style={'stroke'}
            />
          );
        })}
      </Touchable.Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { App };
