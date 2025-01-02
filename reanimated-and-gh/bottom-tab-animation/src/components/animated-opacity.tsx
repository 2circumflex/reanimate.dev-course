import type { PropsWithChildren } from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type AnimatedOpacityProps = PropsWithChildren<{
  isVisible: boolean;
  minOpacity?: number;
}>;

export const AnimatedOpacity: React.FC<AnimatedOpacityProps> = ({
  isVisible,
  children,
  minOpacity = 0,
}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isVisible ? 1 : minOpacity),
    };
  }, [isVisible, minOpacity]);

  return <Animated.View style={rStyle}>{children}</Animated.View>;
};
