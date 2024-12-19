import {
  BlurMask,
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
  const internalPadding = 10;

  const externalPadding = 200;
  const realWidth = width + externalPadding;
  const realHeight = height + externalPadding;
  const realX = externalPadding / 2;
  const realY = externalPadding / 2;
  const center = { x: width / 2 + realX, y: height / 2 + realY };

  return (
    <Canvas
      style={{
        height: realHeight,
        width: realWidth,
        backgroundColor: '#000',
      }}>
      <RoundedRect
        x={realX}
        y={realY}
        width={width}
        height={height}
        color={'red'}
        r={width / 2}>
        <SweepGradient
          c={center}
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
        />
        <BlurMask blur={40} style={'solid'} />
      </RoundedRect>
      <RoundedRect
        x={internalPadding / 2 + realX}
        y={internalPadding / 2 + realY}
        width={width - internalPadding}
        height={height - internalPadding}
        color={'black'}
        r={width / 2}
      />
    </Canvas>
  );
};
