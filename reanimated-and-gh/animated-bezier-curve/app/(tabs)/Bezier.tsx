import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';
// eslint-disable-next-line import/no-extraneous-dependencies
import Touchable from 'react-native-skia-gesture';
import { Circle, Group, Path, Skia } from '@shopify/react-native-skia';

import { InitialPoints } from '../../src/constants';
import { useSharedControlPoint } from '../../src/hooks/useSharedControlPoint';
import { useAnimateThroughPath } from '../../src/hooks/useAnimateThroughPath';
import { SharedBezierPathSvgString } from '../../src/global-animation-state';

export default function Bezier() {
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
  }, []);

  const {
    startAnimation,
    cx: animationX,
    cy: animationY,
  } = useAnimateThroughPath();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
                onEnd={() => {
                  'worklet';

                  SharedBezierPathSvgString.value =
                    bezierPath.value.toSVGString();
                  runOnJS(startAnimation)(bezierPath.value);
                }}
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
        <Circle cx={animationX} cy={animationY} r={12} color={'red'} />
      </Touchable.Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
