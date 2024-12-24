import { useWindowDimensions } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { useMemo } from 'react';

import { AMOUNT_POINTS, LIGHT_GRAPH_SCORES } from '../constants';

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

  const path = useMemo(() => {
    const skPath = Skia.Path.Make();
    for (let i = 0; i < AMOUNT_POINTS; i++) {
      skPath.lineTo(
        (i * windowWidth) / AMOUNT_POINTS,
        height - (LIGHT_GRAPH_SCORES[i] / 100) * height,
      );
    }
    return skPath;
  }, []);

  return (
    <Canvas
      style={{
        width,
        height,
        backgroundColor: 'red',
      }}>
      <Path path={path} color={'black'} style={'stroke'} strokeWidth={3} />
    </Canvas>
  );
};
