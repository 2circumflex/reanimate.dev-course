import type { SkPath } from '@shopify/react-native-skia';
import {
  cancelAnimation,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useCallback } from 'react';

import { PathGeometry } from './utils/geometry';

type Point = {
  x: number;
  y: number;
};

const getPathPoints = (path: SkPath): Point[] => {
  const points: Point[] = [];

  const geometry = new PathGeometry(path);
  const totalLength = geometry.getTotalLength();

  for (let i = 0; i < totalLength; i++) {
    const point = geometry.getPointAtLength(i);
    points.push({ x: point.x, y: point.y });
  }
  return points;
};

export const useAnimateThroughPath = () => {
  const progress = useSharedValue(0);
  const points = useSharedValue<Point[]>([]);

  const startAnimation = useCallback(
    (computedPath: SkPath) => {
      points.value = getPathPoints(computedPath);
      cancelAnimation(progress);
      progress.value = 0;
      progress.value = withTiming(1, { duration: 1000 });
    },
    [points, progress],
  );

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

  return { progress, startAnimation, cx, cy };
};
