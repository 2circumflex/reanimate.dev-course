import { StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Animated, { Keyframe } from 'react-native-reanimated';

const Perspective = 200;

const InitialKeyframe = {
  opacity: 0,
  transform: [
    {
      perspective: Perspective,
    },
    {
      translateY: 75,
    },
    {
      rotateX: '-25deg',
    },
  ],
};

const EndKeyframe = {
  opacity: 1,
  transform: [
    {
      perspective: Perspective,
    },
    {
      translateY: 0,
    },
    {
      rotateX: '0deg',
    },
  ],
};

const CustomFlipIn = new Keyframe({
  from: InitialKeyframe,
  to: EndKeyframe,
}).duration(250);

const CustomFlipOut = new Keyframe({
  from: EndKeyframe,
  to: {
    ...InitialKeyframe,
    transform: [
      {
        perspective: Perspective,
      },
      {
        translateY: -75,
      },
      {
        rotateX: '25deg',
      },
    ],
  },
}).duration(250);

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
          entering={CustomFlipIn}
          exiting={CustomFlipOut}
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
