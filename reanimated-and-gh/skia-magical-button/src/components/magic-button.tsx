import {
  BlurMask,
  Canvas,
  Group,
  RoundedRect,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type MagicButtonProps = {
  onPress?: () => void;
  width: number;
  height: number;
};

export const MagicButton: React.FC<MagicButtonProps> = ({
  width,
  height,
  onPress,
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
    .onTouchesUp(() => {
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onFinalize(() => {
      isTouched.value = false;
      console.log('Finalized');
    });

  const scale = useDerivedValue(() => {
    return withSpring(isTouched.value ? 1.2 : 1);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  }, []);

  const rotate = useDerivedValue(() => {
    return withTiming(isTouched.value ? Math.PI * 2 : 0, {
      duration: 1000,
    });
  }, []);

  const blur = useDerivedValue(() => {
    return withTiming(isTouched.value ? 40 : 0, {
      duration: 1000,
    });
  }, []);

  const transform = useDerivedValue(() => {
    return [
      {
        rotate: rotate.value,
      },
    ];
  }, []);

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={rStyle}>
        <Canvas
          style={{
            height: realHeight,
            width: realWidth,
            backgroundColor: '#000',
          }}>
          <Group
            origin={vec(realX + width / 2, realY + height / 2)}
            transform={transform}>
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
              <BlurMask blur={blur} style={'solid'} />
            </RoundedRect>
          </Group>
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
