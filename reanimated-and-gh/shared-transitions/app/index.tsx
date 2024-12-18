/* eslint-disable import/no-default-export */
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';

import { data } from '../src/constants';

export default function Page() {
  const { width: windowWidth } = useWindowDimensions();
  const spacing = 20;
  const gap = spacing / 4;
  const itemSize = (windowWidth - spacing) / 3;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <View style={{ marginLeft: gap, marginRight: gap }}>
              <Image
                source={item.url}
                style={{
                  width: itemSize,
                  height: itemSize,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
