import { useCallback } from 'react';
import { Tabs } from 'expo-router';

import { ScreenNames } from '../../src/constants';
import { BottomTab } from '../../src/components/bottom-tab';

// eslint-disable-next-line import/no-default-export
export default function Layout() {
  const tabBar = useCallback(() => {
    return <BottomTab />;
  }, []);

  return (
    <Tabs tabBar={tabBar}>
      {Object.values(ScreenNames).map(screenName => {
        return <Tabs.Screen key={screenName} name={screenName} />;
      })}
    </Tabs>
  );
}
