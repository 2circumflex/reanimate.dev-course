import {
  useWindowDimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';

import { ScreenNames } from '../constants';
import { getIconByScreenName } from '../helpers/get-icon-by-screen-name';

import { AnimatedOpacity } from './animated-opacity';

export const BottomTab = () => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  const { width: windowWidth } = useWindowDimensions();
  const tabBarWidth = windowWidth * 0.85;
  const internalHorizontalPadding = windowWidth * 0.05;
  const tabBarItemWidth = tabBarWidth / Object.values(ScreenNames).length;

  return (
    <View
      style={[
        {
          width: tabBarWidth,
          marginBottom: safeBottom,
          paddingHorizontal: internalHorizontalPadding,
        },
        styles.container,
      ]}>
      {Object.values(ScreenNames).map(screenName => {
        return (
          <TouchableOpacity
            key={screenName}
            style={styles.fillCenter}
            onPress={() => {
              //
              router.navigate(screenName);
            }}>
            <AnimatedOpacity
              isVisible={pathname.includes(screenName)}
              minOpacity={0.5}>
              {getIconByScreenName(screenName)}
            </AnimatedOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 65,
    borderRadius: 30,
    borderCurve: 'continuous',
    alignSelf: 'center',
    backgroundColor: '#111',
    flexDirection: 'row',
  },
  fillCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
