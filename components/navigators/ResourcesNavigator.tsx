import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Resources from '@/components/screens/Resources';

const Stack = createNativeStackNavigator();

const ResourcesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Resources">
      <Stack.Screen name="Resources" component={Resources} />
    </Stack.Navigator>
  );
};

export default ResourcesNavigator;
