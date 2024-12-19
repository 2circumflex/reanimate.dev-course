import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
} from '@shopify/react-native-skia';
import React from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';

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

  const isTouched = useSharedValue(false);

  const tapGesture = Gesture.Tap()
    .maxDuration(10000)
    .onBegin(() => {
      isTouched.value = true;
      console.log('Touched');
    })
    .onFinalize(() => {
      isTouched.value = false;
      console.log('Finalized');
    });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View>
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
      </Animated.View>
    </GestureDetector>
  );
};
