import type { SkImage } from '@shopify/react-native-skia';
import {
  Canvas,
  Fill,
  ImageShader,
  makeImageFromView,
} from '@shopify/react-native-skia';
import { createContext, useCallback, useContext, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

const TransitionsContext = createContext({
  prepareTransition: () => {},
});

export const useTransitions = () => {
  return useContext(TransitionsContext);
};

type TransitionsProviderProps = {
  children: React.ReactNode;
};

export const TransitionsProvider: React.FC<TransitionsProviderProps> = ({
  children,
}) => {
  const viewRef = useRef<View>(null);
  const firstImage = useSharedValue<SkImage | null>(null);

  const prepareTransition = useCallback(async () => {
    const imageSnapshot = await makeImageFromView(viewRef);
    firstImage.value = imageSnapshot;
    console.log('prepareTransition');
  }, [firstImage]);

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return (
    <TransitionsContext.Provider
      value={{
        prepareTransition,
      }}>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'red',
          opacity: 0.5,
          pointerEvents: 'none',
        }}>
        <Fill>
          <ImageShader
            image={firstImage}
            width={windowWidth}
            height={windowHeight}
            fit="cover"
          />
        </Fill>
      </Canvas>
      <View ref={viewRef} style={{ flex: 1 }}>
        {children}
      </View>
    </TransitionsContext.Provider>
  );
};
