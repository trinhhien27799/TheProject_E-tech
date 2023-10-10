import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screen
import Login from './Screen/Login';
import ListPhone from './Screen/ListPhone';
import SignUp from './Screen/SignUp';
import ChiTietSP from './Screen/ChiTietSP';

const Stack = createNativeStackNavigator();

const App=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='ProductDetail'
          component={ChiTietSP}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='ListPhone'
          component={ListPhone}
          options={{
            headerShown:false,
          }}
        />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown:false,
        }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerShown:false,
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
