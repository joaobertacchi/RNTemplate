import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { Platform } from 'react-native';

import HomeNavigator from './HomeNavigator';
import PreferencesNavigator from './PreferencesNavigator';
import ResourceNavigator from './ResourcesNavigator';

const Tab = createNativeBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator backBehavior="none">
      <Tab.Screen
        name="HomeNavigator"
        options={{
          title: 'Home',
          tabBarIcon: Platform.select({
            ios: {
              type: 'sfSymbol',
              name: 'house',
            },
            android: {
              type: 'drawableResource',
              name: 'home_24px',
            },
          }),
        }}
        component={HomeNavigator}
      />
      <Tab.Screen
        name="ResourceNavigator"
        options={{
          title: 'Resources',
          tabBarIcon: Platform.select({
            ios: {
              type: 'sfSymbol',
              name: 'magnifyingglass',
            },
            android: {
              type: 'drawableResource',
              name: 'search_24px',
            },
          }),
        }}
        component={ResourceNavigator}
      />
      <Tab.Screen
        name="PreferencesNavigator"
        options={{
          title: 'Preferences',
          tabBarIcon: Platform.select({
            ios: {
              type: 'sfSymbol',
              name: 'gear',
            },
            android: {
              type: 'drawableResource',
              name: 'settings_24px',
            },
          }),
        }}
        component={PreferencesNavigator}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
