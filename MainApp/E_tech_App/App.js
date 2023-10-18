import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './Screen/home/Home';
import Profile from './Screen/profile/profileScreen';
import ChiTietSP from './Screen/ChiTietSP';
import ListPhone from './Screen/ListPhone';
import Login from './Screen/authentication/Login';
import SignUp from './Screen/authentication/SignUp';
import editProfile from './Screen/profile/editPrifile';
import Buttom_Navigation from './Screen/navigation';

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();
const screenOptions = {
  activeTintColor: "#2F7C6E",
  inactiveTintColor: "#222222",
  activeBackgroundColor: "blue"
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
        <Stack.Screen name='ButtonNavigation' component={Buttom_Navigation} options={{ headerShown: false }} />
        
      </Stack.Navigator>
      {/* <Tabs.Navigator
        // default configuration from React Navigation
        tabBarOptions={{
          screenOptions
        }}
      >

        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Icon
                    name="home"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
                    focused={focused}
                />
            )
          }}
        />

        <Tabs.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="shopping-cart"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="bell"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="user"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            )
          }}
        />
      </Tabs.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
