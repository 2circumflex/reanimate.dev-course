import { StatusBar } from 'expo-status-bar';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SegmentedControl } from './components/segmented-control';
import { useState } from 'react';

import { Palette } from './constants';
import { ScoreGraph } from './components/score-graph';

const options = ['Light', 'Standard', 'Pro'];

export function App() {
  const [selectedOption, setSelectedOption] = useState('Standard');

  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
      <ScoreGraph
        width={windowWidth}
        height={250}
        option={selectedOption as 'Light' | 'Standard' | 'Pro'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
