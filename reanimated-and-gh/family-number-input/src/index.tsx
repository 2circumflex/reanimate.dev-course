import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ButtonsGrid } from './components/buttons-grid';
import { AnimatedNumber } from './components/animated-number';

const App = () => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  const [number, setNumber] = useState('0');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimatedNumber number={number} />
      </View>
      <View style={{ flex: 1, marginBottom: safeBottom }}>
        <ButtonsGrid
          onButtonPressed={item => {
            if (item === 'backspace') {
              if (number.length === 1) {
                setNumber('0');
                return;
              }
              setNumber(prevNumber => prevNumber.slice(0, -1));
              return;
            }
            setNumber(prevNumber => {
              if (prevNumber.length === 10) {
                Alert.alert('Error', 'Maximum number length is 10');
                return prevNumber;
              }
              if (prevNumber === '0') {
                return String(item);
              }
              return prevNumber + item;
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export { App };
