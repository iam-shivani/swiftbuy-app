
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Register from './src/screens/Resigter';
import ProductList from './src/screens/ProductList';
import CartList from './src/screens/CartList';
import Checkout from './src/screens/Checkout';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      // headerShown: false
    }}>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
      <Stack.Screen name="ProductList" component={ProductList} options={{headerShown: false}}/>
      <Stack.Screen name="CartList" component={CartList}/>
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
