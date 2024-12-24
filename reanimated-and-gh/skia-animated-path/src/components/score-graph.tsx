import { useWindowDimensions } from 'react-native';
import {
  Canvas,
  CornerPathEffect,
  Group,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import { useMemo } from 'react';

import { AMOUNT_POINTS, LIGHT_GRAPH_SCORES, Palette } from '../constants';

type ScoreGraphProps = {
  option: 'Light' | 'Standard' | 'Pro';
  width: number;
  height: number;
};

export const ScoreGraph: React.FC<ScoreGraphProps> = ({
  option,
  height,
  width,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const internalVerticalPadding = 50;
  const internalHorizontalPadding = 20;
  const fixedHeight = height - internalVerticalPadding * 2;
  const fixedWidth = width - internalHorizontalPadding * 2;

  const path = useMemo(() => {
    const skPath = Skia.Path.Make();
    for (let i = 0; i < AMOUNT_POINTS; i++) {
      skPath.lineTo(
        (i * fixedWidth) / AMOUNT_POINTS,
        fixedHeight - (LIGHT_GRAPH_SCORES[i] / 100) * fixedHeight,
      );
    }
    return skPath;
  }, []);

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
          path={path}
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
