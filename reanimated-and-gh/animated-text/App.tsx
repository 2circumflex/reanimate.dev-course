import { useFonts } from 'expo-font';

import { App } from './src';

const AppContainer = () => {
  const [loaded] = useFonts({
    'SF-Pro-Rounded-Bold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
  });
  if (!loaded) return null;

  return <App />;
};

// eslint-disable-next-line import/no-default-export
export default AppContainer;
