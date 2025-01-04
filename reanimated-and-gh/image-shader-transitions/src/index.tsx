import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import {
  Canvas,
  Fill,
  ImageShader,
  Shader,
  Skia,
  useImage,
} from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { glsl } from './helpers/shader-lib';
import { transition } from './helpers/transition';

const FIRST_IMAGE =
  'https://images.unsplash.com/photo-1596501048547-e9acb71ca798?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const SECOND_IMAGE =
  'https://images.unsplash.com/photo-1531168556467-80aace0d0144?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const butterFlyWaveShader = glsl`
// Author: mandubian
// License: MIT
float amplitude = 2.0;
float waves = 5.0;
float colorSeparation = 0.6;

float PI = 3.14159265358979323846264;
float compute(vec2 p, float progress, vec2 center) {
vec2 o = p*sin(progress * amplitude)-center;
// horizontal vector
vec2 h = vec2(1., 0.);
// butterfly polar function (don't ask me why this one :))
float theta = acos(dot(o, h)) * waves;
return (exp(cos(theta)) - 2.*cos(4.*theta) + pow(sin((2.*theta - PI) / 24.), 5.)) / 10.;
}
vec4 transition(vec2 uv) {
  vec2 p = uv.xy / vec2(1.0).xy;
  float inv = 1. - progress;
  vec2 dir = p - vec2(.5);
  float dist = length(dir);
  float disp = compute(p, progress, vec2(0.5, 0.5)) ;
  vec4 texTo = getToColor(p + inv*disp);
  vec4 texFrom = vec4(
  getFromColor(p + progress*disp*(1.0 - colorSeparation)).r,
  getFromColor(p + progress*disp).g,
  getFromColor(p + progress*disp*(1.0 + colorSeparation)).b,
  1.0);
  return texTo*progress + texFrom*inv;
}

`;

const butterFlyShaderEffect = transition(butterFlyWaveShader);

const App = () => {
  const { width: windowWidth } = useWindowDimensions();
  const canvasHeight = 600;
  const canvasWidth = windowWidth * 0.95;

  const firstImage = useImage(FIRST_IMAGE);
  const secondImage = useImage(SECOND_IMAGE);

  const progress = useSharedValue(0);

  const uniforms = useDerivedValue(() => {
    return {
      progress: progress.value,
      resolution: [canvasWidth, canvasHeight],
    };
  }, [canvasWidth, canvasHeight]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Slider
        style={styles.slider}
        minimumTrackTintColor="#fff"
        onValueChange={value => (progress.value = value)}
      />
      <Canvas
        style={[
          {
            height: canvasHeight,
            width: canvasWidth,
          },
          styles.canvas,
        ]}>
        <Fill>
          <Shader source={butterFlyShaderEffect!} uniforms={uniforms}>
            <ImageShader
              image={firstImage}
              width={canvasHeight}
              height={canvasHeight}
              fit={'cover'}
            />
            <ImageShader
              image={secondImage}
              width={canvasHeight}
              height={canvasHeight}
              fit={'cover'}
            />
          </Shader>
        </Fill>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slider: {
    width: '95%',
    marginTop: 60,
    alignSelf: 'center',
  },
  canvas: {
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 25,
  },
});

export { App };
