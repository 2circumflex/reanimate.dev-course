import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Skia } from '@shopify/react-native-skia';

export const useDrawGesture = () => {
  const skPath = useSharedValue(Skia.Path.Make());
  const isDrawing = useSharedValue(false);

  const pan = Gesture.Pan()
    .onBegin(({ x, y }) => {
      skPath.value = Skia.Path.Make();
      skPath.value.moveTo(x, y);
      isDrawing.value = true;
    })
    .onUpdate(({ x, y }) => {
      skPath.value.lineTo(x, y);
      skPath.value = Skia.Path.MakeFromSVGString(skPath.value.toSVGString()!)!;
    })
    .onFinalize(() => {
      isDrawing.value = false;
    });

  const pathOpacity = useDerivedValue(() => {
    return withTiming(isDrawing.value ? 1 : 0);
  }, []);

  return { pan, pathOpacity, skPath };
};
