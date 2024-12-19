import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { MagicButton } from './components/magic-button';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MagicButton width={100} height={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { App };
