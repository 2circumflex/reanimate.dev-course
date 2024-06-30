import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const CircleRadius = 30;

const App = () => {
  const left = useSharedValue(0);
  const top = useSharedValue(0);
  const scale = useSharedValue(0);

  const previousLeft = useSharedValue(0);
  const previousTop = useSharedValue(0);

  const tapGesture = Gesture.Tap().onBegin(event => {
    previousLeft.value = left.value;
    previousTop.value = top.value;
    left.value = event.x - CircleRadius;
    top.value = event.y - CircleRadius;
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      left: left.value,
      top: top.value,
      transform: [{ scale: scale.value }],
    };
  }, []);

  const rPreviousStyle = useAnimatedStyle(() => {
    return {
      left: previousLeft.value,
      top: previousTop.value,
    };
  }, []);

  useAnimatedReaction(
    () => {
      return left.value; // or top.value
    },
    (curr, prev) => {
      if (curr !== prev && curr !== 0) {
        cancelAnimation(scale);
        scale.value = 0;
        scale.value = withSpring(1, {
          mass: 0.5,
        });
      }
    },
  );

  const animatedLeft = useDerivedValue(() => {
    return withTiming(left.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

  const animatedTop = useDerivedValue(() => {
    return withTiming(top.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

  const rMagicCircleStyle = useAnimatedStyle(() => {
    return {
      left: animatedLeft.value,
      top: animatedTop.value,
    };
  }, []);

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={styles.container}>
        <StatusBar style="light" />
        <Animated.View style={[styles.baseCircle, rStyle]} />
        <Animated.View style={[styles.baseCircle, rPreviousStyle]} />
        <Animated.View
          style={[
            styles.baseCircle,
            {
              backgroundColor: '#0074d3',
            },
            rMagicCircleStyle,
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  baseCircle: {
    height: CircleRadius * 2,
    width: CircleRadius * 2,
    borderRadius: CircleRadius,
    backgroundColor: '#2f2f2f',
    position: 'absolute',
  },
});

export { App };
