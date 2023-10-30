import { StyleSheet } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import React from 'react';
import Home from './Home';
import CartScreen from '../CartScreen';
import NotificationScreen from '../NotificationScreen';
import AccountScreen from '../AccountScreen';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather';

const Tabs = AnimatedTabBarNavigator();


const BottomNavigation = ({navigation,route}) => {
  const userData = route.params.registrationData.user
  return (
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
          initialParams={userData}
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
  );
}

export default BottomNavigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});