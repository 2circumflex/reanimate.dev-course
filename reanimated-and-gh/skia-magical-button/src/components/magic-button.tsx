import {
  Canvas,
  Circle,
  Rect,
  RoundedRect,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';

type MagicButtonProps = {
  onPress?: () => void;
  width: number;
  height: number;
};

export const MagicButton: React.FC<MagicButtonProps> = ({
  width,
  height,
}: MagicButtonProps) => {
  const center = { x: width / 2, y: height / 2 };
  const internalPadding = 10;

  return (
    <Canvas
      style={{
        height: height,
        width: width,
      }}>
      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
        color={'red'}
        r={width / 2}>
        <SweepGradient
          c={center}
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
        />
      </RoundedRect>
      <RoundedRect
        x={internalPadding / 2}
        y={internalPadding / 2}
        width={width - internalPadding}
        height={height - internalPadding}
        color={'black'}
        r={width / 2}
      />
    </Canvas>
  );
};
