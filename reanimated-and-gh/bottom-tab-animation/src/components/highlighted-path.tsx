import { useMemo } from 'react';
import {
  Canvas,
  LinearGradient,
  Path,
  RoundedRect,
  Skia,
} from '@shopify/react-native-skia';

type HighlightedPathProps = {
  width: number;
  height: number;
};

export const HighlightedPath: React.FC<HighlightedPathProps> = ({
  width,
  height,
}) => {
  const internalCanvasHOrizontalPadding = 2.5;
  const canvasWidth = width - internalCanvasHOrizontalPadding * 2;

  const path = useMemo(() => {
    const skPath = Skia.Path.Make();
    skPath.moveTo(internalCanvasHOrizontalPadding * 3, 0);
    skPath.lineTo(width - internalCanvasHOrizontalPadding * 3, 0);
    skPath.lineTo(width, height);
    skPath.lineTo(0, height);
    skPath.close();

    return skPath;
  }, [width, height]);

  return (
    <Canvas
      style={{
        width,
        height,
      }}>
      <Path path={path} color={'white'} opacity={0.5}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: height }}
          colors={['white', 'transparent']}
        />
      </Path>
      <RoundedRect
        x={internalCanvasHOrizontalPadding}
        y={0}
        width={canvasWidth}
        height={7}
        color={'white'}
        r={20}
      />
    </Canvas>
  );
};
