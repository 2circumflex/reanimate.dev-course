import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { SkPath } from '@shopify/react-native-skia';
import { Canvas, Circle, Path } from '@shopify/react-native-skia';
import { GestureDetector } from 'react-native-gesture-handler';

import { useDrawGesture } from './hooks/useDrawGesture';
import { PathGeometry } from './utils/geometry';

type Point = {
  x: number;
  y: number;
};

const getPathPoints = (path: SkPath) => {
  const points: Point[] = [];
  // Easy solution
  // const countPoints = path.countPoints();
  // for (let i = 0; i < countPoints; i++) {
  //   const point = path.getPoint(i);
  //   points.push({ x: point.x, y: point.y });
  // }
  // return points;

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
  const [points, setPoints] = useState<Point[]>([]);

  const { pan, pathOpacity, skPath } = useDrawGesture({
    onComplete: computedPath => {
      setPoints(getPathPoints(computedPath));
    },
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
            opacity={pathOpacity}
          />
          {points.map(
            (point, index) =>
              index % 10 === 0 && (
                <Circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={2}
                  color="red"
                />
              ),
          )}
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
