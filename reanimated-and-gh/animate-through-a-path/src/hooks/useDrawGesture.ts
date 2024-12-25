import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import type { SkPath } from '@shopify/react-native-skia';
import { Skia } from '@shopify/react-native-skia';

type UseDrawGestureParams = {
  onComplete: (completePath: SkPath) => void;
};

export const useDrawGesture = ({ onComplete }: UseDrawGestureParams) => {
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
      runOnJS(onComplete)(skPath.value);
    });

  const pathOpacity = useDerivedValue(() => {
    return withTiming(isDrawing.value ? 1 : 0);
  }, []);

  return { pan, pathOpacity, skPath };
};
