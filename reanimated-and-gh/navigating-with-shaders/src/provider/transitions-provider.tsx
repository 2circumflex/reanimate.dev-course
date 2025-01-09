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

vec2 direction = vec2(0.0, 1.0);

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

const hexagonalizeShader = glsl`
// Author: Fernando Kuteken
// License: MIT
// Hexagonal math from: http://www.redblobgames.com/grids/hexagons/
float ratio = 1.0;
int steps = 30;
float horizontalHexagons = 10;

struct Hexagon {
  float q;
  float r;
  float s;
};

Hexagon createHexagon(float q, float r){
  Hexagon hex;
  hex.q = q;
  hex.r = r;
  hex.s = -q - r;
  return hex;
}

Hexagon roundHexagon(Hexagon hex){
  
  float q = floor(hex.q + 0.5);
  float r = floor(hex.r + 0.5);
  float s = floor(hex.s + 0.5);

  float deltaQ = abs(q - hex.q);
  float deltaR = abs(r - hex.r);
  float deltaS = abs(s - hex.s);

  if (deltaQ > deltaR && deltaQ > deltaS)
    q = -r - s;
  else if (deltaR > deltaS)
    r = -q - s;
  else
    s = -q - r;

  return createHexagon(q, r);
}

Hexagon hexagonFromPoint(vec2 point, float size) {
  
  point.y /= ratio;
  point = (point - 0.5) / size;
  
  float q = (sqrt(3.0) / 3.0) * point.x + (-1.0 / 3.0) * point.y;
  float r = 0.0 * point.x + 2.0 / 3.0 * point.y;

  Hexagon hex = createHexagon(q, r);
  return roundHexagon(hex);
  
}

vec2 pointFromHexagon(Hexagon hex, float size) {
  
  float x = (sqrt(3.0) * hex.q + (sqrt(3.0) / 2.0) * hex.r) * size + 0.5;
  float y = (0.0 * hex.q + (3.0 / 2.0) * hex.r) * size + 0.5;
  
  return vec2(x, y * ratio);
}

vec4 transition (vec2 uv) {
  
  float dist = 2.0 * min(progress, 1.0 - progress);
  dist = steps > 0 ? ceil(dist * float(steps)) / float(steps) : dist;
  
  float size = (sqrt(3.0) / 3.0) * dist / horizontalHexagons;
  
  vec2 point = dist > 0.0 ? pointFromHexagon(hexagonFromPoint(uv, size), size) : uv;

  return mix(getFromColor(point), getToColor(point), progress);
  
}
`;

const ShaderTransitionEffect = transition(hexagonalizeShader);

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
