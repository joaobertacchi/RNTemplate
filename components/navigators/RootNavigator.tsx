import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import HomeNavigator from './HomeNavigator';
import PreferencesNavigator from './PreferencesNavigator';
import ResourceNavigator from './ResourcesNavigator';

const Tab = createNativeBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator backBehavior="none">
      <Tab.Screen
        name="HomeNavigator"
        options={{ title: 'Home' }}
        component={HomeNavigator}
      />
      <Tab.Screen
        name="ResourceNavigator"
        options={{ title: 'Resources' }}
        component={ResourceNavigator}
      />
      <Tab.Screen
        name="PreferencesNavigator"
        options={{ title: 'Preferences' }}
        component={PreferencesNavigator}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
