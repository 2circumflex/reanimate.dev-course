import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { generateRandomColor } from './utils';

const App = () => {
  const [ids, setIds] = useState<string[]>([]);

  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        setIds(() => [generateRandomColor(), ...ids]);
      }}>
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={{ paddingTop: 70 }}
        style={{ flex: 1 }}>
        {ids.map((colorId, _) => {
          return (
            <Animated.View
              layout={LinearTransition.springify()}
              entering={FadeIn.duration(250)}
              exiting={FadeOut.duration(250)}
              key={colorId}
              style={{
                height: 90,
                width: '95%',
                backgroundColor: colorId,
                borderRadius: 20,
                alignSelf: 'center',
                marginBottom: 10,
              }}
            />
          );
        })}
      </ScrollView>
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
