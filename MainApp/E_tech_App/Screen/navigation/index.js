import {  Text,  View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import CartScreen from '../CartScreen';
import AccountScreen from '../AccountScreen';
import NotificationScreen from '../NotificationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    borderRadius: 20,
    background: "#2A32F6"
  }
}
export default function index() {
  return (
     <NavigationContainer>
       <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Ionicons name="home-outline" size={24} color={focused ? "white": "#111"} />
                  <Text style={{fonSize: 12, color: "white"}}>Trang chủ</Text>
            </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="CartScreen" 
          component={CartScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <AntDesign name="shoppingcart" size={24} color={focused ? "white": "#111"}/>
                  <Text style={{fonSize: 12, color: "white"}}>Giỏ hàng</Text>
            </View>
              )
            }
          }}
          />
          
          <Tab.Screen
           name="NotificationScreen" 
           component={NotificationScreen}
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Ionicons name="notifications" size={24} color={focused ? "white": "#111"}/>
                  <Text style={{fonSize: 12, color: "white"}}>Thông báo</Text>
            </View>
              )
            }
          }}
           />
          <Tab.Screen 
          name="AccountScreen" 
          component={AccountScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <MaterialCommunityIcons name="account" size={24} color={focused ? "white": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>Tài khoản</Text>
            </View>
              )
            }
          }}
          />
       </Tab.Navigator>
     </NavigationContainer>
)
}
