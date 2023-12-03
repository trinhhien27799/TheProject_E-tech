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
import Quenmk2 from './Screen/authentication/confirmOTP'
import Taomk from './Screen/authentication/Taomkmoi'
import Taomk2 from './Screen/authentication/Taomkmoi2'

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar"
import AddressTest from './Screen/AddressTest'
import BottomNavigation from './Screen/home/bottomNavigation'
import NotificationScreen from './Screen/NotificationScreen'
import ResetPassword from './Screen/profile/resetPassword'


import { Alert, Button, Image, Modal, Text, TouchableOpacity, View } from 'react-native'
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
import AddAdress from './Screen/AddAdress'
import MyVoucher from './Screen/MyVoucher'
import ShippingMethod from './Screen/ShippingMethod'

import ListPhoneByCate from './Screen/ListPhoneByCate'
import DetailProducts from './Screen/products/main'
import ProductComment from './Component/ProductComment'
import SplashScreen from './Screen/splash/SplashScreen'
import DetailCommentScreen from './Screen/DetailCommentScreen'
import SettingScreen from './Screen/profile/setting'
import NewOrderScreen from './Screen/OrderPackageScenes/NewOrderScreen'
import CartScreen from './Screen/YourCart/CartScreen'
import AddCommentScreen from './Screen/AddCommentScreen';
import CommentButton from './Component/CommentButton';
import CancelOrderView from './Screen/CancelOrderView';
import tailwind from 'twrnc';

import { Ionicons } from '@expo/vector-icons'

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import SoundPlayer from './utils/notificationSound'
import { getUser, setDeviceToken } from './session'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})




const registerForPushNotificationsAsync = async () => {
  let token

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    })
  } else {
    alert('Must use physical device for Push Notifications')
  }

  return token.data
}


const Stack = createNativeStackNavigator()
const Tabs = AnimatedTabBarNavigator()


export default App = () => {


  const notificationListener = useRef()
  const responseListener = useRef()
  const [notification, setNotification] = useState(null)
  const navigationContainerRef = useRef()

  const ClickNotification = (notification) => {
    navigationContainerRef.current.navigate(notification.request.content.data.route, { billId: notification.request.content.data.billId })
    setNotification(null)
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setDeviceToken(token)
    })
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("notification nhận được: ", notification)
      setNotification(notification)
      SoundPlayer.playSound()
      setTimeout(() => {
        setNotification(null)
      }, 8000)
    })
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      ClickNotification(response.notification)
    })


    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationContainerRef}>

        <Stack.Navigator
          initialRouteName='Splash' >
          <Stack.Screen name='CartScreen' component={CartScreen} options={{ headerShown: false }} />

          <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
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
          <Stack.Screen name='DetailProducts' component={DetailProducts} options={{ headerShown: false }} />
          <Stack.Screen name='SettingScreen' component={SettingScreen} options={{ headerShown: false }} />

          <Stack.Screen name='AddressScreen' component={AddressTest} options={{ headerShown: false }} />
          <Stack.Screen name='AddAdressScreen' component={AddAdress} options={{ headerShown: true }} />
          <Stack.Screen name='PTTT' component={PTTT} options={{ headerShown: false }} />
          <Stack.Screen name='DialogQR' component={DialogQR} options={{ headerShown: false }} />
          <Stack.Screen name='MyVoucher' component={MyVoucher} options={{ headerShown: false }} />
          <Stack.Screen name='Makhuyenmai' component={Makhuyenmai} options={{ headerShown: false }} />
          <Stack.Screen name='ApDungVoucher' component={ApDungVoucher} options={{ headerShown: false }} />
          <Stack.Screen name='ShippingMethod' component={ShippingMethod} options={{ headerShown: false }} />


          <Stack.Screen name='NotificationsScreen' component={NotificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name='ViewItem' component={ViewItem} options={{ headerShown: false }} />
          <Stack.Screen name='OrderDetailScreen' component={BillDetailScreen} options={{
            headerShown: true,
            headerTintColor: 'white',
            headerTitle: 'Chi tiết đơn hàng',
            headerStyle: { backgroundColor: '#3366ff' }
          }} />

          <Stack.Screen name='ChooseAddressScreen' component={DialogAddress} options={{ headerShown: false }} />

          <Stack.Screen name='PayScreen' component={Pay} options={{
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity style={tailwind`mr-2`} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerTintColor: 'white',
            headerTitle: 'Thanh toán',
            headerStyle: { backgroundColor: '#3366ff' }
          }} />
          <Stack.Screen name='MapScreen' component={MapViewScreen} options={{ headerShown: false }} />
          <Stack.Screen name='DemoShipMoney' component={DemoShipMoneyResoveScreen} />
          <Stack.Screen name='ListPhoneByCate' component={ListPhoneByCate} />

          <Stack.Screen name='Comment' component={ProductComment} options={{ headerShown: false }} />
          <Stack.Screen name='ListCommentScreen' component={DetailCommentScreen} options={{ headerShown: false }} />

          <Stack.Screen name='NewOrderScreen' component={NewOrderScreen} options={{ headerShown: false }} />
          <Stack.Screen name='AddCommentScreen' component={AddCommentScreen} options={{ headerShown: false }} />
          <Stack.Screen name='CommentButton' component={CommentButton} options={{ headerShown: false }} />
          <Stack.Screen name='CancelOrderScreen' component={CancelOrderView} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

      {notification &&
        <View
          onTouchStart={() => {
            ClickNotification(notification)
          }}
          style={{
            backgroundColor: 'whitesmoke', padding: 10, marginHorizontal: 20, borderRadius: 14, elevation: 10, position: 'absolute',
            top: 85, width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
          }}>
          <Image
            style={{ width: 40, height: 40, resizeMode: 'center', borderRadius: 8 }}
            source={{ uri: notification.request.content.data.image }} />
          <View style={{ marginStart: 8, flex: 1 }}>
            <Text>{notification.request.content.title}</Text>
            <Text>{notification.request.content.body}</Text>
          </View>
        </View>}

    </View>
  )
}

