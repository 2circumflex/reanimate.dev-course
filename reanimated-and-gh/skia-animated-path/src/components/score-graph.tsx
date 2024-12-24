import {
  Canvas,
  CornerPathEffect,
  DashPathEffect,
  Group,
  Line,
  Path,
  Skia,
  usePathInterpolation,
  vec,
} from '@shopify/react-native-skia';
import { useDerivedValue, withTiming } from 'react-native-reanimated';

import {
  AMOUNT_POINTS,
  LIGHT_GRAPH_SCORES,
  PRO_GRAPH_SCORES,
  STANDARD_GRAPH_SCORES,
} from '../constants';

type ScoreGraphProps = {
  option: 'Light' | 'Standard' | 'Pro';
  width: number;
  height: number;
};

const getNormalizedY = (value: number, height: number) => {
  return height - (value / 100) * height;
};

const getPathFromScores = (scores: number[], width: number, height: number) => {
  const skPath = Skia.Path.Make();
  for (let i = 0; i < scores.length; i++) {
    skPath.lineTo(
      (i * width) / AMOUNT_POINTS,
      getNormalizedY(scores[i], height),
    );
  }
  return skPath;
};

export const ScoreGraph: React.FC<ScoreGraphProps> = ({
  option,
  height,
  width,
}) => {
  const internalVerticalPadding = 50;
  const internalHorizontalPadding = 20;
  const fixedHeight = height - internalVerticalPadding * 2;
  const fixedWidth = width - internalHorizontalPadding * 2;

  const progress = useDerivedValue(() => {
    switch (option) {
      case 'Light':
        return 0;
      case 'Standard':
        return 0.5;
      case 'Pro':
        return 1;
    }
  }, [option]);

  const animatedProgress = useDerivedValue(() => {
    return withTiming(progress.value);
  }, []);

  const animatedPath = usePathInterpolation(
    animatedProgress,
    [0, 0.5, 1],
    [
      getPathFromScores(LIGHT_GRAPH_SCORES, fixedWidth, fixedHeight),
      getPathFromScores(STANDARD_GRAPH_SCORES, fixedWidth, fixedHeight),
      getPathFromScores(PRO_GRAPH_SCORES, fixedWidth, fixedHeight),
    ],
  );

  return (
    <Canvas
      style={{
        width,
        height,
      }}>
      <Group transform={[{ translateY: internalVerticalPadding }]}>
        <Line
          p1={vec(0, getNormalizedY(70, fixedHeight))}
          p2={vec(width, getNormalizedY(70, fixedHeight))}
          strokeWidth={2}
          color={'#cac8c2'}>
          <DashPathEffect intervals={[4, 4]} />
        </Line>
      </Group>
      <Group
        transform={[
          { translateY: internalVerticalPadding },
          {
            translateX: internalHorizontalPadding,
          },
        ]}>
        <Path
          path={animatedPath}
          color={'#c100cfff'}
          style={'stroke'}
          strokeWidth={4}
          strokeCap={'round'}>
          <CornerPathEffect r={20} />
        </Path>
      </Group>
    </Canvas>
  );
};
