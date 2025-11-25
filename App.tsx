/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@/components/navigators/RootNavigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <GluestackUIProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigator />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
};

export default App;
