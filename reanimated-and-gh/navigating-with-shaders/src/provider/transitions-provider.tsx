import { createContext, useCallback, useContext } from 'react';
import { View } from 'react-native';

const TransitionsContext = createContext({
  prepareTransition: () => {},
});

export const useTransitions = () => {
  return useContext(TransitionsContext);
};

type TransitionsProviderProps = {
  children: React.ReactNode;
};

export const TransitionsProvider: React.FC<TransitionsProviderProps> = ({
  children,
}) => {
  const prepareTransition = useCallback(() => {
    console.log('prepareTransition');
  }, []);

  return (
    <TransitionsContext.Provider
      value={{
        prepareTransition,
      }}>
      <View style={{ flex: 1 }}>{children}</View>
    </TransitionsContext.Provider>
  );
};
