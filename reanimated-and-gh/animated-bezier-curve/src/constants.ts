import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const InitialPoints = {
  first: {
    x: 100,
    y: 100,
  },
  second: {
    x: width - 100,
    y: 200,
  },
  third: {
    x: width - 100,
    y: height - 300,
  },
  fourth: {
    x: 140,
    y: height - 200,
  },
};
