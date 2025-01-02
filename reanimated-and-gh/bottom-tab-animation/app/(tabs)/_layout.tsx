import { Tabs } from 'expo-router';

import { ScreenNames } from '../../src/constants';

// eslint-disable-next-line import/no-default-export
export default function Layout() {
  return (
    <Tabs>
      {Object.values(ScreenNames).map(screenName => {
        return <Tabs.Screen key={screenName} name={screenName} />;
      })}
    </Tabs>
  );
}
