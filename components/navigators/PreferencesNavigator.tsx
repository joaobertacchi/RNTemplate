import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Preferences from '@/components/screens/Preferences';

const Stack = createNativeStackNavigator();

const PreferencesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Preferences">
      <Stack.Screen name="Preferences" component={Preferences} />
    </Stack.Navigator>
  );
};

export default PreferencesNavigator;
