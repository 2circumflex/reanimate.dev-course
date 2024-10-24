import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SquareSize = 120;

const App = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  // position animation shared values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          // rotate.value = withRepeat(withTiming(rotate.value + 90), 4, true);
          rotate.value = withTiming(rotate.value + 90);
        }}
        style={[styles.square, rStyle]}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const MaxTranslateAmount = 100;
          // We want to update translateX between [-100, 100]
          const tX =
            Math.random() * MaxTranslateAmount * 2 - MaxTranslateAmount;
          const tY =
            Math.random() * MaxTranslateAmount * 2 - MaxTranslateAmount;
          translateX.value = withSpring(tX);
          translateY.value = withSpring(tY);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SquareSize,
    width: SquareSize,
    backgroundColor: '#00a6ff',
    borderRadius: 30,
    borderCurve: 'continuous',
  },
  button: {
    height: 64,
    width: 64,
    backgroundColor: '#111',
    borderRadius: 32,
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
});

export { App };
