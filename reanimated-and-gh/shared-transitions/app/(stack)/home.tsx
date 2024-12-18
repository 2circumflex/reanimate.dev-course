import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';

import { data, Palette } from '../../src/constants';
import { AnimatedImage } from '../../src/components/animated-image';

export default function Page() {
  const { width: windowWidth } = useWindowDimensions();
  const spacing = 20;
  const gap = spacing / 4;
  const itemSize = (windowWidth - spacing) / 3;

  const headerHeight = useHeaderHeight();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={data}
        numColumns={3}
        contentContainerStyle={{
          paddingTop: headerHeight,
        }}
        renderItem={({ item, index }) => {
          const tag = index.toString();
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('detail', {
                  tag,
                  imageUri: item.url,
                });
              }}
              style={{
                marginLeft: gap,
                marginRight: gap,
              }}>
              <AnimatedImage
                source={{ uri: item.url }}
                sharedTransitionTag={tag}
                style={{
                  height: itemSize,
                  width: itemSize,
                }}
                contentFit="cover"
                cachePolicy={'memory-disk'}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.background,
  },
});
