/* eslint-disable import/no-extraneous-dependencies */
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimateableText from 'react-native-animateable-text';

const App = () => {
  const count = useSharedValue(0);

  const countString = useDerivedValue(() => {
    return Math.floor(count.value).toString();
  }, [count]);

  console.log('App rendered', count);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AnimateableText style={[styles.count]} text={countString} />
      <TouchableOpacity
        onPress={() => {
          count.value = withTiming(Math.random() * 100, { duration: 1000 });
        }}
        style={styles.floatingButton}>
        <FontAwesome name="random" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'SF-Pro-Rounded-Bold',
    width: 200,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 48,
    right: 32,
    width: 64,
    aspectRatio: 1,
    borderRadius: 32,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { App };
