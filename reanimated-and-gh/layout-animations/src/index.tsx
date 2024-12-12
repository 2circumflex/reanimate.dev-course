import { StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  FlipInEasyX,
  FlipInXDown,
  FlipInXUp,
  FlipOutEasyX,
  FlipOutXDown,
  FlipOutXUp,
  RotateInDownLeft,
  RotateOutDownLeft,
} from 'react-native-reanimated';

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        console.log('Pressed');
        setIsVisible(prev => !prev);
      }}>
      <StatusBar style="auto" />
      {isVisible && (
        <Animated.View
          entering={FlipInXDown}
          exiting={FlipOutXDown}
          style={{
            height: 120,
            aspectRatio: 1,
            backgroundColor: '#0086e6',
            borderRadius: 20,
            borderCurve: 'continuous',
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { App };
