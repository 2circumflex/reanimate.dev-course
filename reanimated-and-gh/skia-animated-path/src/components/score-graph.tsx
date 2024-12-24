import {
  Canvas,
  CornerPathEffect,
  Group,
  Path,
  Skia,
  usePathInterpolation,
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

const getPathFromScores = (scores: number[], width: number, height: number) => {
  const skPath = Skia.Path.Make();
  for (let i = 0; i < scores.length; i++) {
    skPath.lineTo(
      (i * width) / AMOUNT_POINTS,
      height - (scores[i] / 100) * height,
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

  // const graphScores = useMemo(() => {
  //   switch (option) {
  //     case 'Light':
  //       return LIGHT_GRAPH_SCORES;
  //     case 'Standard':
  //       return STANDARD_GRAPH_SCORES;
  //     case 'Pro':
  //       return PRO_GRAPH_SCORES;
  //   }
  // }, [option]);

  // const path = useMemo(() => {
  //   return getPathFromScores(graphScores, fixedWidth, fixedHeight);
  // }, [graphScores]);

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
      <Group
        transform={[
          { translateY: internalVerticalPadding },
          { translateX: internalHorizontalPadding },
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
