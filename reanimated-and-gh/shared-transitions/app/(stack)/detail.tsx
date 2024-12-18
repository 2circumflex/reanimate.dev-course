import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useCallback } from 'react';

import { AnimatedImage } from '../../src/components/animated-image';

const Detail = () => {
  const { imageUri, tag } = useLocalSearchParams<{
    tag: string;
    imageUri: string;
  }>();

  const navigation = useNavigation();

  const changeX = useSharedValue(0);
  const changeY = useSharedValue(0);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const panGesture = Gesture.Pan()
    .onChange(event => {
      changeX.value = event.translationX;
      changeY.value = event.translationY;

      if (Math.abs(event.translationY) > 150) {
        runOnJS(goBack)();
      }
    })
    .onFinalize(() => {
      changeX.value = withSpring(0, { mass: 0.5 });
      changeY.value = withSpring(0, { mass: 0.5 });
    });

  const scale = useDerivedValue(() => {
    return Math.max(1 - Math.abs(changeY.value) / 400, 0.5);
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: changeX.value,
        },
        {
          translateY: changeY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <BlurView
        intensity={25}
        tint="systemMaterialDark"
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={rStyle}>
          <AnimatedImage
            source={{
              uri: imageUri,
            }}
            sharedTransitionTag={tag}
            style={{
              width: '70%',
              aspectRatio: 1,
              borderRadius: 25,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              borderCurve: 'continuous',
            }}
            contentFit="cover"
            cachePolicy={'memory-disk'}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Detail;
