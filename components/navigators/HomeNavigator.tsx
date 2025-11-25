import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/components/screens/Home';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
