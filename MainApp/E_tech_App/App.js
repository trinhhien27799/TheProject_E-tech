import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Import Screen
import Login from './Screen/Login';
import ListPhone from './Screen/ListPhone';
import SignUp from './Screen/SignUp';
import ChiTietSP from './Screen/ChiTietSP';
import Home from './Screen/home/Home';
import index from './Screen/navigation';
import CartScreen from './Screen/CartScreen';
import NotificationScreen from './Screen/NotificationScreen';
import AccountScreen from './Screen/AccountScreen';

// Navigation Import
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();

const screenOptions = {
  
}

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        // default configuration from React Navigation
        tabBarOptions={{
          activeTintColor: "#1e1e1f",
          inactiveTintColor: "#2D4BCf",
          activeBackgroundColor: "white",
          tabStyle: {
            backgroundColor: "#4f9af0"
          }  
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
      </Tabs.Navigator>
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
