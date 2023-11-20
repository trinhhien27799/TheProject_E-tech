import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screen/home/Home';
import Profile from './Screen/profile/profileScreen';
import ProductDetail from './Screen/ProductDetail';
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
import AddressTest from './Screen/AddressTest';
import BottomNavigation from './Screen/home/bottomNavigation';
import NotificationScreen from './Screen/NotificationScreen';
import ResetPassword from './Screen/profile/resetPassword';
import OrderScene from './Screen/OrderPackageScenes/OrderScene';
import { Button } from 'react-native';
import DialogAddress from './Screen/DialogAddress';
import Pay from './Screen/Pay';
import MapViewScreen from './Component/MapView';
import DemoShipMoneyResoveScreen from './DataMathResolve/DemoShipMoneyResoveScreen';
import PTTT from './Screen/PTTT/PTTT';
import DialogQR from './Screen/PTTT/DialogQR';
import Makhuyenmai from './Screen/Makhuyenmai';
import ApDungVoucher from './Screen/ApDungVoucher'

import BillDetailScreen from './Screen/BillDetailScreen';
import ViewItem from './Screen/search/viewItem';
import AddAdress from './Screen/AddAdress';
import MyVoucher from './Screen/MyVoucher';

import ListPhoneByCate from './Screen/ListPhoneByCate';
import DetailProducts from './Screen/products/detailProducts';
import ProductComment from './Component/ProductComment';
import SplashScreen from './Screen/splash/SplashScreen';

const Stack = createNativeStackNavigator();
const Tabs = AnimatedTabBarNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'

      >
        <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ headerShown: false }} />
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
        <Stack.Screen name='DetailPoducts' component={DetailProducts} options={{ headerShown: false }} />

        <Stack.Screen name='AddressScreen' component={AddressTest} options={{ headerShown: false }} />
        <Stack.Screen name='AddAdressScreen' component={AddAdress} options={{ headerShown: true }} />
        <Stack.Screen name='PTTT' component={PTTT} options={{ headerShown: false }} />
        <Stack.Screen name='DialogQR' component={DialogQR} options={{ headerShown: false }} />
        <Stack.Screen name='MyVoucher' component={MyVoucher} options={{ headerShown: false }} />
        <Stack.Screen name='Makhuyenmai' component={Makhuyenmai} options={{ headerShown: false }} />
        <Stack.Screen name='ApDungVoucher' component={ApDungVoucher} options={{ headerShown: false }} />

        <Stack.Screen name='NotificationsScreen' component={NotificationScreen} options={{ headerShown: false}} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} options={{ headerShown: false}} />
        <Stack.Screen name='ViewItem' component={ViewItem} options={{ headerShown: false}} />
        <Stack.Screen name='OrderDetailScreen' component={BillDetailScreen} options={{ headerShown: true, 
        headerTintColor: 'white',  
        headerTitle:'Chi tiết đơn hàng',
        headerStyle: { backgroundColor: '#3366ff' }}} />

        <Stack.Screen name='ChooseAddressScreen' component={DialogAddress} options={{ headerShown: false }} />
        <Stack.Screen name='OrderScreen' component={OrderScene} options={{
          headerShown: true, headerLeft: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Exit"
              color="blue"
            />
          )
        }} />

        <Stack.Screen name='PayScreen' component={Pay} options={{ headerShown: false }} />
        <Stack.Screen name='MapScreen' component={MapViewScreen} options={{ headerShown: false }} />
        <Stack.Screen name='DemoShipMoney' component={DemoShipMoneyResoveScreen} />
        <Stack.Screen name='ListPhoneByCate' component={ListPhoneByCate}/>

        <Stack.Screen name='Comment' component={ProductComment} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
