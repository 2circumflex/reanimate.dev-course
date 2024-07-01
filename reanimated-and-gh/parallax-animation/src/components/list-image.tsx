import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type ListImageProps = {
  uri: string;
  imageWidth: number;
  itemWidth: number;
  style?: StyleProp<ViewStyle>;
  scrollOffset: SharedValue<number>;
  index: number;
};

const { width: ScreenWidth } = Dimensions.get('window');

export const ListImage: React.FC<ListImageProps> = ({
  uri: imageUri,
  imageWidth,
  itemWidth,
  style,
  scrollOffset,
  index,
}) => {
  const inputRange = [
    itemWidth * (index - 1),
    itemWidth * index,
    itemWidth * (index + 1),
  ];

  const rImageStyle = useAnimatedStyle(() => {
    const outputRagne = [-ScreenWidth / 2, 0, ScreenWidth / 2];
    const translateX = interpolate(scrollOffset.value, inputRange, outputRagne);

    return {
      transform: [
        {
          scale: 1.7,
        },
        {
          translateX: translateX,
        },
      ],
    };
  }, []);

  const rContainerStyle = useAnimatedStyle(() => {
    const outputRagne = [1, 1.05, 1];
    const scale = interpolate(scrollOffset.value, inputRange, outputRagne);
    return {
      transform: [{ scale }],
    };
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          overflow: 'hidden',
          borderRadius: 20,
        },
        rContainerStyle,
      ]}>
      <Animated.Image
        key={imageUri}
        source={{ uri: imageUri }}
        resizeMode={'cover'}
        style={[{ width: imageWidth, aspectRatio: 0.6 }, rImageStyle]}
      />
    </Animated.View>
  );
};
