import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Home from './Home';
import CartScreen from '../YourCart/CartScreen';
import NotificationScreen from '../NotificationScreen';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather';
import Makhuyenmai from '../Makhuyenmai';
import Profile from '../profile/profileScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUser } from '../../session';
import SettingScreen from '../profile/setting';

const Tabs = AnimatedTabBarNavigator();

const BottomNavigation = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const user = getUser();
  

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "#1e1e1f",
        inactiveTintColor: "#2D4BCf",
        activeBackgroundColor: "white",
        tabStyle: {
          backgroundColor: "#4f9af0"
        },
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
          ),
          title: 'Trang chủ'
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
          ),
          title: 'Giỏ hàng'
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
          ),
          title: 'Thông báo'
        }}
      />

      <Tabs.Screen
        name="Voucher"
        component={Makhuyenmai}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="gift"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
          title: 'Khuyến mại'
        }}
      />

      <Tabs.Screen
        name="Account"
        component={user!=null?Profile:SettingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="user"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
          title: 'Tài khoản'
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