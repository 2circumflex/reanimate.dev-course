import { Canvas } from '@shopify/react-native-skia';

type ScoreGraphProps = {
  option: 'Light' | 'Standard' | 'Pro';
  width: number;
  height: number;
};

export const ScoreGraph: React.FC<ScoreGraphProps> = ({
  option,
  height,
  width,
}) => {
  return (
    <Canvas
      style={{
        width,
        height,
        backgroundColor: 'red',
      }}>
      {/*  */}
    </Canvas>
  );
};
