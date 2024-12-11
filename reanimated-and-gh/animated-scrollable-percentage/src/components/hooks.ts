import type { SharedValue } from 'react-native-reanimated';
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type ProgressState = 'idle' | 'expanded' | 'end';

export const useSharedProgressState = (progress: SharedValue<number>) => {
  const state: SharedValue<ProgressState> = useDerivedValue(() => {
    if (progress.value === 0) return 'idle';
    if (progress.value === 1) return 'end';
    return 'expanded';
  });

  const rIdleViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(state.value === 'idle' ? 1 : 0),
    };
  }, []);

  const rEndViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(state.value === 'end' ? 1 : 0),
      pointerEvents: state.value === 'end' ? 'auto' : 'none',
    };
  }, []);

  const rExpandedViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(state.value === 'expanded' ? 1 : 0),
    };
  }, []);

  return {
    rIdleViewStyle,
    rEndViewStyle,
    rExpandedViewStyle,
    state,
  };
};
