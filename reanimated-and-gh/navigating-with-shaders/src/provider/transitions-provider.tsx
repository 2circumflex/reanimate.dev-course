import type { SkImage } from '@shopify/react-native-skia';
import {
  Canvas,
  Fill,
  ImageShader,
  makeImageFromView,
  Shader,
} from '@shopify/react-native-skia';
import { createContext, useCallback, useContext, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { glsl } from '../shader-helpers/shader-lib';
import { transition } from '../shader-helpers/transition';

const TransitionsContext = createContext({
  prepareTransition: (): Promise<void> => {
    return Promise.resolve();
  },
  runTransition: (_?: () => void): Promise<void> => {
    return Promise.resolve();
  },
});

export const useTransitions = () => {
  return useContext(TransitionsContext);
};

type TransitionsProviderProps = {
  children: React.ReactNode;
};

const shader = glsl`
// Author: pschroen
// License: MIT

vec2 direction = vec2(-1.0, 1.0);

const float smoothness = 0.5;
const vec2 center = vec2(0.5, 0.5);

vec4 transition (vec2 uv) {
  vec2 v = normalize(direction);
  v /= abs(v.x) + abs(v.y);
  float d = v.x * center.x + v.y * center.y;
  float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
  return mix(getFromColor((uv - 0.5) * (1.0 - m) + 0.5), getToColor((uv - 0.5) * m + 0.5), m);
}
`;

const ShaderTransitionEffect = transition(shader);

const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

export const TransitionsProvider: React.FC<TransitionsProviderProps> = ({
  children,
}) => {
  const viewRef = useRef<View>(null);
  const firstImage = useSharedValue<SkImage | null>(null);
  const secondImage = useSharedValue<SkImage | null>(null);

  const progress = useSharedValue(0);

  const prepareTransition = useCallback(async () => {
    const imageSnapshot = await makeImageFromView(viewRef);
    firstImage.value = imageSnapshot;
  }, [firstImage]);

  const runTransition = useCallback(
    async (exitingCallback?: () => void) => {
      const imageSnapshot = await makeImageFromView(viewRef);
      secondImage.value = imageSnapshot;
      progress.value = withTiming(
        1,
        {
          duration: 2000,
        },
        isFinished => {
          if (isFinished) {
            progress.value = 0;
            firstImage.value = null;
            secondImage.value = null;
            if (exitingCallback) {
              runOnJS(exitingCallback)();
            }
          }
        },
      );
    },
    [firstImage, secondImage, progress],
  );

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const uniforms = useDerivedValue(() => {
    return {
      resolution: [windowWidth, windowHeight],
      progress: progress.value,
    };
  }, [windowWidth, windowHeight]);

  const rCanvasStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value > 0 ? 1 : 0,
      pointerEvents: progress.value > 0 ? 'auto' : 'none',
    };
  }, []);

  return (
    <TransitionsContext.Provider
      value={{
        prepareTransition,
        runTransition,
      }}>
      <AnimatedCanvas
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          },
          rCanvasStyle,
        ]}>
        <Fill>
          <Shader source={ShaderTransitionEffect} uniforms={uniforms}>
            <ImageShader
              image={secondImage}
              width={windowWidth}
              height={windowHeight}
              fit="cover"
            />
            <ImageShader
              image={firstImage}
              width={windowWidth}
              height={windowHeight}
              fit="cover"
            />
          </Shader>
        </Fill>
      </AnimatedCanvas>
      <View ref={viewRef} style={{ flex: 1 }}>
        {children}
      </View>
    </TransitionsContext.Provider>
  );
};
