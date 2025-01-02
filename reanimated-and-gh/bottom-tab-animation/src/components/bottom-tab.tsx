import {
  useWindowDimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { ScreenNames } from '../constants';
import { getIconByScreenName } from '../helpers/get-icon-by-screen-name';

import { AnimatedOpacity } from './animated-opacity';
import { HighlightedPath } from './highlighted-path';

const BottomTabBarHeight = 65;

export const BottomTab = () => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  const { width: windowWidth } = useWindowDimensions();
  const tabBarWidth = windowWidth * 0.85;
  const internalHorizontalPadding = windowWidth * 0.05;
  const tabBarItemWidth =
    (tabBarWidth - internalHorizontalPadding * 2) /
    Object.values(ScreenNames).length;

  const rHighlightedViewStyle = useAnimatedStyle(() => {
    const offset =
      tabBarItemWidth *
      Object.values(ScreenNames)
        .map(item => '/' + item)
        .indexOf(pathname);

    return {
      left: withTiming(internalHorizontalPadding + offset),
    };
  }, [pathname, internalHorizontalPadding]);

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
      <Animated.View
        style={[
          {
            left: internalHorizontalPadding,
            width: tabBarItemWidth,
          },
          rHighlightedViewStyle,
          styles.highlightedView,
        ]}>
        <HighlightedPath width={tabBarItemWidth} height={BottomTabBarHeight} />
      </Animated.View>
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
    height: BottomTabBarHeight,
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
  highlightedView: {
    position: 'absolute',
    height: BottomTabBarHeight,
  },
});
