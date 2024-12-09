import { Dimensions, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { Images } from './constants';
import { ListImage } from './components/list-image';

const { width: WindowWidth } = Dimensions.get('window');

const ListImageWidth = WindowWidth * 0.8;

const ItemInternalPadding = 10;
const ItemContainerWidth = ListImageWidth + ItemInternalPadding * 2;

const ListPadding = (WindowWidth - ItemContainerWidth) / 2;

const App = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingLeft: ListPadding,
          paddingRight: ListPadding,
        }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ItemContainerWidth}
        pagingEnabled
        decelerationRate={'fast'}>
        {Images.map((imageUri, index) => {
          return (
            <ListImage
              index={index}
              scrollOffset={scrollOffset}
              imageWidth={ListImageWidth}
              itemWidth={ItemContainerWidth}
              style={{
                marginHorizontal: ItemInternalPadding,
              }}
              uri={imageUri}
              key={imageUri}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export { App };
