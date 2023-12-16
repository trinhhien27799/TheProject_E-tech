import * as React from 'react';
import DialogAddress from '../Screen/DialogAddress'
import Pay from '../Screen/Pay'
import MapViewScreen from '../Component/MapView'
import DemoShipMoneyResoveScreen from '../DataMathResolve/DemoShipMoneyResoveScreen'
import PTTT from '../Screen/PTTT/PTTT'
import DialogQR from '../Screen/PTTT/DialogQR'
import Makhuyenmai from '../Screen/Makhuyenmai'
import ApDungVoucher from '../Screen/ApDungVoucher'

import BillDetailScreen from '../Screen/BillDetailScreen'
import ViewItem from '../Screen/search/viewItem'
import AddAddress from '../Screen/AddAdress'
import MyVoucher from '../Screen/MyVoucher'
import ShippingMethod from '../Screen/ShippingMethod'

import ListPhoneByCate from '../Screen/ListPhoneByCate'
import DetailProducts from '../Screen/products/main'
import SplashScreen from '../Screen/splash/SplashScreen'
import DetailCommentScreen from '../Screen/DetailCommentScreen'
import NewOrderScreen from '../Screen/OrderPackageScenes/NewOrderScreen'
import AddCommentScreen from '../Screen/AddCommentScreen';
import CommentButton from '../Component/CommentButton';
import CancelOrderView from '../Screen/CancelOrderView';

import FavoriteScreen from '../Screen/favorite/FavoriteScreen'
import NewAddress from '../Screen/address/NewAddress'
import ChatsScreen from '../Screen/chats/ChatsScreen'
import MoMoPaymentScreen from '../Screen/pay/Momo'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../Screen/home/Home'
import Profile from '../Screen/profile/profileScreen'
import ListPhone from '../Screen/ListPhone'
import Login from '../Screen/authentication/Login'
import SignUp from '../Screen/authentication/SignUp'

import SearchScreen from '../Screen/search/searchScreen'

import Quenmk1 from '../Screen/authentication/forgotEmail'
import ConfirmOTP from '../Screen/authentication/confirmOTP'
import Taomk from '../Screen/authentication/Taomkmoi'
import Taomk2 from '../Screen/authentication/Taomkmoi2'

import AddressScreen from '../Screen/address/AddressScreen'
import BottomNavigation from '../Screen/home/bottomNavigation'
import NotificationScreen from '../Screen/NotificationScreen'
import ResetPassword from '../Screen/profile/resetPassword'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactScreen from '../Screen/contacts/Contacts';
import RefundScreen from '../Screen/refunds/RefundScreen';
export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function setTopLevelNavigator(navigatorRef) {
    navigationRef.current = navigatorRef;
}

export function MainNavigator() {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer ref={setTopLevelNavigator}>
            <Stack.Navigator
                initialRouteName='Splash' >
                <Stack.Screen name='RefundScreen' component={RefundScreen} options={{
                    headerTitle: 'Yêu cầu hoàn tiền'
                }} />
                <Stack.Screen name='ContactScreen' component={ContactScreen} options={{
                    headerTitle: 'Liên hệ'
                }} />
                <Stack.Screen name='MoMoPaymentScreen' component={MoMoPaymentScreen} options={{ headerShown: false }} />

                <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name='ListPhone' component={ListPhone} options={{
                    headerTitle: "Tất cả sản phẩm",
                }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name='Quenmk1' component={Quenmk1} options={{ headerShown: false }} />
                <Stack.Screen name='ConfirmOTP' component={ConfirmOTP} options={{ headerShown: false }} />
                <Stack.Screen name='Taomk' component={Taomk} options={{ headerShown: false }} />
                <Stack.Screen name='Taomk2' component={Taomk2} options={{ headerShown: false }} />
                <Stack.Screen name='ButtonNavigation' component={BottomNavigation} options={{ headerShown: false }} />
                <Stack.Screen name='SearchScreen' component={SearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name='DetailProducts' component={DetailProducts} options={{ headerShown: false }} />
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

                <Stack.Screen name='NewOrderScreen' component={NewOrderScreen} options={{
                    headerTitle: 'Đơn hàng của bạn'
                }} />
                <Stack.Screen name='AddCommentScreen' component={AddCommentScreen} options={{ headerShown: false }} />
                <Stack.Screen name='CommentButton' component={CommentButton} options={{ headerShown: false }} />
                <Stack.Screen name='CancelOrderScreen' component={CancelOrderView} options={{
                    headerTitle: 'Hủy đơn hàng'
                }} />


                <Stack.Screen name='FavoriteScreen' component={FavoriteScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
