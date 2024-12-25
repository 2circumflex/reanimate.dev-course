import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Canvas, Circle, Path, SkPath } from '@shopify/react-native-skia';
import { GestureDetector } from 'react-native-gesture-handler';

import { useDrawGesture } from './hooks/useDrawGesture';
import { useState } from 'react';

type Point = {
  x: number;
  y: number;
};

const getPathPoints = (path: SkPath) => {
  const points: Point[] = [];
  const countPoints = path.countPoints();
  for (let i = 0; i < countPoints; i++) {
    const point = path.getPoint(i);
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
          {points.map((point, index) => (
            <Circle key={index} cx={point.x} cy={point.y} r={2} color="white" />
          ))}
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
