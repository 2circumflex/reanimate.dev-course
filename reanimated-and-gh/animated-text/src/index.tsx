import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Canvas,
  // RadialGradient,
  Text as SkText,
  SweepGradient,
  useFont,
  vec,
} from '@shopify/react-native-skia';
// import AnimateableText from 'react-native-animateable-text';
// import { ReText } from 'react-native-redash';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sfProBold = require('../assets/fonts/SF-Pro-Rounded-Bold.otf');

const App = () => {
  const count = useSharedValue(0);

  const countString = useDerivedValue(() => {
    return Math.floor(count.value).toString();
  }, [count]);

  const fontSize = 80;
  const font = useFont(sfProBold, fontSize);

  const canvasWidth = 200;
  const canvasHeight = 200;

  const x = useDerivedValue(() => {
    const textWidth = font?.measureText(countString.value).width ?? 0;
    // const textWidth =
    //   font
    //     ?.getGlyphWidths(font.getGlyphIDs(countString.value))
    //     .reduce((acc, w) => acc + w, 0) ?? 0;
    return canvasWidth / 2 - textWidth / 2;
  }, [font]);

  const y = useDerivedValue(() => {
    return canvasHeight / 2 + fontSize / 4;
  }, [font]);

  const c = useDerivedValue(() => {
    return vec(x.value, y.value);
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* <ReText style={styles.count} text={countString} /> */}
      {/* <AnimateableText style={styles.count} text={countString} /> */}
      <Canvas
        style={{
          width: canvasWidth,
          height: canvasHeight,
          backgroundColor: 'black',
        }}>
        <SkText font={font} color={'black'} text={countString} x={x} y={y}>
          {/* <RadialGradient c={c} r={canvasWidth / 2} colors={['red', 'blue']} /> */}
          <SweepGradient c={c} colors={['cyan', 'magenta', 'yellow', 'cyan']} />
        </SkText>
      </Canvas>
      <TouchableOpacity
        onPress={() => {
          count.value = withTiming(Math.random() * 100, { duration: 1000 });
        }}
        style={styles.floatingButton}>
        <FontAwesome name="random" size={32} color={'#111'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // count: {
  //   fontSize: 80,
  //   fontFamily: 'SF-Pro-Rounded-Bold',
  //   width: 200,
  //   textAlign: 'center',
  // },
  floatingButton: {
    position: 'absolute',
    bottom: 48,
    right: 32,
    width: 64,
    aspectRatio: 1,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { App };
