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

import SearchScreen from './Screen/search/searchScreen';

import Quenmk1 from './Screen/authentication/forgotEmail'
import Quenmk2 from './Screen/authentication/confirmOTP'
import Taomk from './Screen/authentication/Taomkmoi'
import Taomk2 from './Screen/authentication/Taomkmoi2'

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import BillScreen from './Screen/BillScreen';
import AddressTest from './Screen/AddressTest';
import AddAdress from './Screen/AddAdress';
import BottomNavigation from './Screen/home/bottomNavigation';
import NotificationScreen from './Screen/NotificationScreen';
import ResetPassword from './Screen/profile/resetPassword';

import BillDetailScreen from './Screen/BillDetailScreen';
const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
      >
        <Stack.Screen name='BillScreen' component={BillScreen} options={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#3366ff' }
        }} />
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />

        <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name='ProductDetail' component={ChiTietSP} options={{ headerShown: false }} />
        <Stack.Screen name='ListPhone' component={ListPhone} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='Quenmk1' component={Quenmk1} options={{ headerShown: false }} />
        <Stack.Screen name='Quenmk2' component={Quenmk2} options={{ headerShown: false }} />
        <Stack.Screen name='Taomk' component={Taomk} options={{ headerShown: false }} />
        <Stack.Screen name='Taomk2' component={Taomk2} options={{ headerShown: false }} />
        <Stack.Screen name='EditProfile' component={editProfile} options={{ headerShown: false }} />
        <Stack.Screen name='ButtonNavigation' component={BottomNavigation} options={{ headerShown: false }} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name='AddressScreen' component={AddressTest} options={{ headerShown: false }} />
        <Stack.Screen name='AddAdressScreen' component={AddAdress} options={{ headerShown: false }} />
        <Stack.Screen name='NotificationsScreen' component={NotificationScreen} options={{ headerShown: false}} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} options={{ headerShown: false}} />
        <Stack.Screen name='BillDetailScreen' component={BillDetailScreen} options={{ headerShown: true, 
        headerTintColor: 'white',  
        headerTitle:'Chi tiết đơn hàng',
        headerStyle: { backgroundColor: '#3366ff' }}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
