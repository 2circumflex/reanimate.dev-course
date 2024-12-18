import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AnimatedImage } from '../../src/components/animated-image';

const Detail = () => {
  const { imageUri, tag } = useLocalSearchParams<{
    tag: string;
    imageUri: string;
  }>();

  const navigation = useNavigation();

  return (
    <View
      onTouchEnd={() => {
        navigation.goBack();
      }}
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
    </View>
  );
};

export default Detail;
