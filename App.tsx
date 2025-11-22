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
import Welcome from '@/components/Welcome';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GluestackUIProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
};

const AppContent = () => {
  return <Welcome />;
};

export default App;
