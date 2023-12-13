import React, { useEffect, useRef, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Screen/home/Home'
import Profile from './Screen/profile/profileScreen'
import ListPhone from './Screen/ListPhone'
import Login from './Screen/authentication/Login'
import SignUp from './Screen/authentication/SignUp'
import editProfile from './Screen/profile/editProfile'

import SearchScreen from './Screen/search/searchScreen'

import Quenmk1 from './Screen/authentication/forgotEmail'
import ConfirmOTP from './Screen/authentication/confirmOTP'
import Taomk from './Screen/authentication/Taomkmoi'
import Taomk2 from './Screen/authentication/Taomkmoi2'

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar"
import AddressScreen from './Screen/address/AddressScreen'
import BottomNavigation from './Screen/home/bottomNavigation'
import NotificationScreen from './Screen/NotificationScreen'
import ResetPassword from './Screen/profile/resetPassword'


import { Image, Text, View } from 'react-native'
import DialogAddress from './Screen/DialogAddress'
import Pay from './Screen/Pay'
import MapViewScreen from './Component/MapView'
import DemoShipMoneyResoveScreen from './DataMathResolve/DemoShipMoneyResoveScreen'
import PTTT from './Screen/PTTT/PTTT'
import DialogQR from './Screen/PTTT/DialogQR'
import Makhuyenmai from './Screen/Makhuyenmai'
import ApDungVoucher from './Screen/ApDungVoucher'

import BillDetailScreen from './Screen/BillDetailScreen'
import ViewItem from './Screen/search/viewItem'
import AddAddress from './Screen/AddAdress'
import MyVoucher from './Screen/MyVoucher'
import ShippingMethod from './Screen/ShippingMethod'

import ListPhoneByCate from './Screen/ListPhoneByCate'
import DetailProducts from './Screen/products/main'
import SplashScreen from './Screen/splash/SplashScreen'
import DetailCommentScreen from './Screen/DetailCommentScreen'
import SettingScreen from './Screen/profile/setting'
import NewOrderScreen from './Screen/OrderPackageScenes/NewOrderScreen'
import AddCommentScreen from './Screen/AddCommentScreen';
import CommentButton from './Component/CommentButton';
import CancelOrderView from './Screen/CancelOrderView';

import FavoriteScreen from './Screen/favorite/FavoriteScreen'
import NewAddress from './Screen/address/NewAddress'
import ChatsScreen from './Screen/chats/ChatsScreen'
import MoMoPaymentScreen from './Screen/pay/Momo'
import { requestUserPermission, NotificationListenner } from './utils/notification_helper'
import  SoundPlayer from './utils/notificationSound' 


const Stack = createNativeStackNavigator()
const Tabs = AnimatedTabBarNavigator()


export default App = () => {
  const [notification, setNotification] = useState(null)
  const navigationContainerRef = useRef()


  const ClickNotification = (route, dataId) => {
    navigationContainerRef.current.navigate(route, { dataId: dataId })
    setNotification(null)
  }

  useEffect(() => {
    requestUserPermission()
    NotificationListenner(setNotification)
  }, [])


  useEffect(() => {
    if (notification) {
      SoundPlayer.playSound()
    }
  }, [notification])




  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationContainerRef}>

        <Stack.Navigator
          initialRouteName='Splash' >
          <Stack.Screen name='MoMoPaymentScreen' component={MoMoPaymentScreen} options={{ headerShown: false }} />

          <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name='ListPhone' component={ListPhone} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name='Quenmk1' component={Quenmk1} options={{ headerShown: false }} />
          <Stack.Screen name='ConfirmOTP' component={ConfirmOTP} options={{ headerShown: false }} />
          <Stack.Screen name='Taomk' component={Taomk} options={{ headerShown: false }} />
          <Stack.Screen name='Taomk2' component={Taomk2} options={{ headerShown: false }} />
          <Stack.Screen name='EditProfile' component={editProfile} options={{ headerShown: false }} />
          <Stack.Screen name='ButtonNavigation' component={BottomNavigation} options={{ headerShown: false }} />
          <Stack.Screen name='SearchScreen' component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name='DetailProducts' component={DetailProducts} options={{ headerShown: false }} />
          <Stack.Screen name='SettingScreen' component={SettingScreen} options={{ headerShown: false }} />

          <Stack.Screen name='AddressScreen' component={AddressScreen} options={{ headerShown: false }} />
          <Stack.Screen name='AddAddressScreen' component={AddAddress} options={{
            headerTitle: "Thêm địa chỉ"
          }} />
          <Stack.Screen name='NewAddress' component={NewAddress} options={{
            headerTitle: "Thêm địa chỉ"
          }} />

          <Stack.Screen name='PTTT' component={PTTT} options={{
            headerTitle: "Phương thức thanh toán"
          }} />
          <Stack.Screen name='DialogQR' component={DialogQR} options={{ headerShown: false }} />
          <Stack.Screen name='MyVoucher' component={MyVoucher} options={{
            headerTitle: "Mã giảm giá đã lưu"
          }} />
          <Stack.Screen name='Makhuyenmai' component={Makhuyenmai} options={{ headerShown: false }} />
          <Stack.Screen name='ApDungVoucher' component={ApDungVoucher} options={{
            headerTitle: "Lựa chọn mã giảm giá"
          }} />
          <Stack.Screen name='ShippingMethod' component={ShippingMethod} options={{
            headerTitle: "Phương thức vận chuyển"
          }} />


          <Stack.Screen name='NotificationsScreen' component={NotificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} options={{
            headerTitle: "Đổi mật khẩu"
          }} />
          <Stack.Screen name='ChatsScreen' component={ChatsScreen} options={{ headerShown: false }} />

          <Stack.Screen name='ViewItem' component={ViewItem} options={{ headerShown: false }} />
          <Stack.Screen name='OrderDetailScreen' component={BillDetailScreen} options={{
            headerTitle: 'Chi tiết đơn hàng'
          }} />

          <Stack.Screen name='ChooseAddressScreen' component={DialogAddress} options={{ headerShown: false }} />

          <Stack.Screen name='PayScreen' component={Pay} options={{
            headerTitle: "Đặt hàng"
          }} />
          <Stack.Screen name='MapScreen' component={MapViewScreen} options={{ headerShown: false }} />
          <Stack.Screen name='DemoShipMoney' component={DemoShipMoneyResoveScreen} />
          <Stack.Screen name='ListPhoneByCate' component={ListPhoneByCate} />
          <Stack.Screen name='ListCommentScreen' component={DetailCommentScreen} options={{ headerShown: false }} />

          <Stack.Screen name='NewOrderScreen' component={NewOrderScreen} options={{ headerShown: false }} />
          <Stack.Screen name='AddCommentScreen' component={AddCommentScreen} options={{ headerShown: false }} />
          <Stack.Screen name='CommentButton' component={CommentButton} options={{ headerShown: false }} />
          <Stack.Screen name='CancelOrderScreen' component={CancelOrderView} options={{ headerShown: false }} />


          <Stack.Screen name='FavoriteScreen' component={FavoriteScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

      {notification &&
        <View
          onTouchStart={() => {
            ClickNotification(notification.data.route, notification.data.dataId)
          }}
          style={{
            backgroundColor: 'whitesmoke', padding: 10, marginHorizontal: 20, borderRadius: 14, elevation: 10, position: 'absolute',
            top: 85, width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
          }}>
          {notification.notification.android.imageUrl && <Image
            style={{ width: 40, height: 40, resizeMode: 'center', borderRadius: 8 }}
            source={{ uri: notification.notification.android.imageUrl }} />}
          <View style={{ marginStart: 8, flex: 1 }}>
            <Text>{notification.notification.title} </Text>
            <Text>{notification.notification.body}</Text>
          </View>
        </View>}

    </View>
  )
}

