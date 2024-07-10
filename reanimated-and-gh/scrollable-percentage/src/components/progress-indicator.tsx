import { StyleSheet, Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReText } from 'react-native-redash';

import { useSharedProgressState } from './hooks';

type ProgressIndicatorProps = {
  readingTime: number;
  progress: SharedValue<number>;
  onReset: () => void;
};

const MIN_PROGRESS_INDICATOR_SIZE = 80;

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  readingTime,
  progress,
  onReset,
}) => {
  const { rIdleViewStyle, rEndViewStyle, rExpandedViewStyle, state } =
    useSharedProgressState(progress);

  const rStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(
        state.value === 'expanded' ? 200 : MIN_PROGRESS_INDICATOR_SIZE,
      ),
    };
  }, []);

  const rExpandedProgressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  }, []);

  const progressPercentage = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, rStyle]}>
        {/* Idle View Container */}
        <Animated.Text style={[styles.idleLabel, rIdleViewStyle]}>
          {readingTime} min
        </Animated.Text>
        {/* End View Container */}
        <Animated.View
          onTouchEnd={onReset}
          style={[
            {
              position: 'absolute',
              zIndex: 1,
            },
            rEndViewStyle,
          ]}>
          <AntDesign
            name="arrowup"
            size={32}
            color="rgba(255, 255, 255, 0.5)"
          />
        </Animated.View>
        {/* Expanded View Container */}
        <Animated.View style={[styles.expandedContainer, rExpandedViewStyle]}>
          <ReText text={progressPercentage} style={styles.progressText} />
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[styles.progressPercentage, rExpandedProgressBarStyle]}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: MIN_PROGRESS_INDICATOR_SIZE,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: '100%',
    borderRadius: MIN_PROGRESS_INDICATOR_SIZE / 2,
    borderWidth: 8,
    borderColor: '#202020',
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  idleLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
  },
  expandedContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  progressText: {
    color: '#9D9D9D',
    fontSize: 17,
    marginRight: 12,
  },
  progressBarContainer: {
    width: 100,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#191919',
    overflow: 'hidden',
  },
  progressPercentage: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#9D9D9D',
  },
});
