import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screen/home/Home';
import Profile from './Screen/profile/profileScreen';
import ChiTietSP from './Screen/ChiTietSP';
import ListPhone from './Screen/ListPhone';
import Login from './Screen/authentication/Login';
import SignUp from './Screen/authentication/SignUp';
import editProfile from './Screen/profile/editProfile';
import ButtomNavigation from './Screen/home/bottomNavigation';


import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();
const screenOptions = {
  
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SignUp'
      >
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name='ProductDetail' component={ChiTietSP} options={{ headerShown: false }} />
        <Stack.Screen name='ListPhone' component={ListPhone} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='EditProfile' component={editProfile} options={{ headerShown: false }} />
        <Stack.Screen name='ButtonNavigation' component={ButtomNavigation} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
