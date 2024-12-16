/* eslint-disable import/no-extraneous-dependencies */
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ButtonsGrid } from './components/buttons-grid';

const App = () => {
  const { bottom: safeBottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
        }}
      />
      <View style={{ flex: 1, marginBottom: safeBottom }}>
        <ButtonsGrid
          onButtonPressed={item => {
            console.log('button pressed', item);
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
