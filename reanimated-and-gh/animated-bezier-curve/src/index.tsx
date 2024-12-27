import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Circle, Group, Path, Skia } from '@shopify/react-native-skia';
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

  const bezierPath = useDerivedValue(() => {
    const skPath = Skia.Path.Make();

    skPath.moveTo(first.cx.value, first.cy.value);
    skPath.cubicTo(
      second.cx.value,
      second.cy.value,
      third.cx.value,
      third.cy.value,
      fourth.cx.value,
      fourth.cy.value,
    );
    return skPath;
  }, []);

  const bezierPathVisualization = useDerivedValue(() => {
    const skPath = Skia.Path.Make();

    skPath.moveTo(first.cx.value, first.cy.value);
    skPath.lineTo(second.cx.value, second.cy.value);

    skPath.moveTo(third.cx.value, third.cy.value);
    skPath.lineTo(fourth.cx.value, fourth.cy.value);

    return skPath;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Touchable.Canvas
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <Path
          path={bezierPath}
          color={'white'}
          style={'stroke'}
          strokeWidth={2}
        />
        <Path
          path={bezierPathVisualization}
          color={'rgba(255, 255, 255, 0.4)'}
          style={'stroke'}
          strokeWidth={2}
        />
        {controlPoints.map(({ cx, cy, controlPoint }, index) => {
          const onUpdate = (event: { x: number; y: number }) => {
            'worklet';
            controlPoint.value = { x: event.x, y: event.y };
          };

          const isStartOrEnd = index === 0 || index === 3;

          const color = isStartOrEnd ? 'white' : 'rgba(255, 255, 255, 0.4)';

          return (
            <Group key={index}>
              <Touchable.Circle
                cx={cx}
                cy={cy}
                onStart={onUpdate}
                onActive={onUpdate}
                r={12}
                color={color}
                strokeWidth={2}
                style={'stroke'}
              />
              <Circle
                cx={cx}
                cy={cy}
                r={12}
                color={'black'}
                strokeWidth={2}
                style={'fill'}
              />
            </Group>
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
