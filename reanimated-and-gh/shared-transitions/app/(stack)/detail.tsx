import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';

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
      <Image
        source={{
          uri: imageUri,
        }}
        style={{
          width: '70%',
          aspectRatio: 1,
          borderRadius: 25,
          borderCurve: 'continuous',
        }}
      />
    </View>
  );
};

export default Detail;
