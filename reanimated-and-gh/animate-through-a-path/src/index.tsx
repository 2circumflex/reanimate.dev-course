import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { SkPath } from '@shopify/react-native-skia';
import { Canvas, Circle, Path } from '@shopify/react-native-skia';
import { GestureDetector } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useDrawGesture } from './hooks/useDrawGesture';
import { PathGeometry } from './utils/geometry';

type Point = {
  x: number;
  y: number;
};

const getPathPoints = (path: SkPath): Point[] => {
  const points: Point[] = [];
  // Easy solution
  // const countPoints = path.countPoints();
  // for (let i = 0; i < countPoints; i++) {
  //   const point = path.getPoint(i);
  //   points.push({ x: point.x, y: point.y });
  // }
  // return points;

  // This check is missing in the tutorial
  // But it's needed in order to avoid crashed
  // when the path is empty
  // (i.e. when the user didn't draw anything but just tapped on the screen)
  const countPoints = path.countPoints();
  if (countPoints <= 1) return [];
  // Contour solution
  const geometry = new PathGeometry(path);
  const totalLength = geometry.getTotalLength();

  for (let i = 0; i < totalLength; i++) {
    const point = geometry.getPointAtLength(i);
    points.push({ x: point.x, y: point.y });
  }
  return points;
};

const App = () => {
  // const [points, setPoints] = useState<Point[]>([]);
  const points = useSharedValue<Point[]>([]);

  const progress = useSharedValue(0);

  const { pan, pathOpacity, skPath } = useDrawGesture({
    onComplete: computedPath => {
      points.value = getPathPoints(computedPath);
      cancelAnimation(progress);
      progress.value = 0;
      progress.value = withTiming(1, { duration: 1000 });
    },
  });

  const cx = useDerivedValue(() => {
    if (points.value.length <= 1) return 0;
    const inputRange = points.value.map(
      (_, index) => index / points.value.length,
    );
    const pointsX = points.value.map(point => point.x);
    return interpolate(progress.value, inputRange, pointsX);
  }, [points]);

  const cy = useDerivedValue(() => {
    if (points.value.length <= 1) return 0;
    const inputRange = points.value.map(
      (_, index) => index / points.value.length,
    );
    const pointsY = points.value.map(point => point.y);
    return interpolate(progress.value, inputRange, pointsY);
  }, [points]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GestureDetector gesture={pan}>
        <Canvas style={{ flex: 1, backgroundColor: 'black' }}>
          <Path
            path={skPath}
            color={'white'}
            style={'stroke'}
            strokeWidth={2}
            opacity={pathOpacity}
          />
          <Circle cx={cx} cy={cy} r={10} color="white" />
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
