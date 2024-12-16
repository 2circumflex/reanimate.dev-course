/* eslint-disable import/no-extraneous-dependencies */
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { TouchableFeedback } from './touchable-feedback';

const ButtonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'backspace'] as const;

type ButtonItemType = (typeof ButtonItems)[number];
type ButtonsGridProps = {
  onButtonPressed: (item: ButtonItemType) => void;
};

export const ButtonsGrid: React.FC<ButtonsGridProps> = ({
  onButtonPressed,
}) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      {ButtonItems.map(item => {
        return (
          <View key={item} style={styles.container}>
            <TouchableFeedback
              style={styles.buttonContainer}
              disabled={item === null}
              onPress={() => {
                return onButtonPressed(item);
              }}>
              {typeof item === 'number' && (
                <Text style={styles.number}>{item}</Text>
              )}
              {item === 'backspace' && (
                <FontAwesome5 name="backspace" size={24} color="#fff" />
              )}
            </TouchableFeedback>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '33.333%',
    height: '25%',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  buttonContainer: {
    flex: 1,
    borderRadius: 20,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 30,
    fontFamily: 'SF-Pro-Rounded-Bold',
    color: '#fff',
  },
});
