import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Skia } from '@shopify/react-native-skia';

import { useAnimateThroughPath } from '../../src/hooks/useAnimateThroughPath';
import { SharedBezierPathSvgString } from '../../src/global-animation-state';

const AnimatedCircle = () => {
  const {
    startAnimation,
    cx: animationX,
    cy: animationY,
  } = useAnimateThroughPath();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: animationX.value },
        { translateY: animationY.value },
      ],
    };
  });

  return (
    <View
      onTouchEnd={() => {
        const skPath = Skia.Path.MakeFromSVGString(
          SharedBezierPathSvgString.value,
        )!;
        startAnimation(skPath);
      }}
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 24,
            width: 24,
            backgroundColor: 'red',
            borderRadius: 12,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default AnimatedCircle;
