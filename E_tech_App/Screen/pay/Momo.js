import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Platform, AppState } from 'react-native'
import RNMomosdk from 'react-native-momosdk'
import LottieView from 'lottie-react-native'
import { createBill, updateStatusPaymentBill } from '../../CallApi/billApi'
import { clearListCart, setVoucher } from '../../session'

const MoMoPaymentScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const data = route.params.data
    const [status, setStatus] = useState(0)
    // 0: quá trình đặt hàng
    // -1: đặt hàng thất bại
    // 1: Đặt hàng thành công - cod
    // 2: Đặt thành công momo -đã thanh toán
    // 3: Đặt thành công momo chưa thanh toán
    const [src, setSrc] = useState(require('../../assets/logo.json'))
    const [textStatus, setTextStatus] = useState('')
    var momo = -1


    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!');
            }

            appState.current = nextAppState;
            if (appState.current == 'active' && momo == -1) setStatus(3)
        });

        return () => {
            subscription.remove();
        };
    }, []);


    useEffect(() => {
        try {
            if (data?.billId != null) {
                setTextStatus('Đang tiến hành đặt hàng thanh toán')
                payNow(data.value, data.billId)
            } else {
                setTextStatus('Đang tiến hành đặt hàng đặt hàng')
                create()
            }
        } catch (error) {
            console.log('MomoScreen: ', error)
            setStatus(-1)
        }
    }, [])





    useEffect(() => {
        if (status == 0) return
        if (data?.billId != null) {
            setTextStatus(status == 2 ? 'Thanh toán thành công' : 'Thanh toán thất bại')
            setSrc(status == 2 ? require('../../assets/success.json') : require('../../assets/failure.json'))
            setTimeout(() => {
                navigation.goBack()
            }, 1400)
            return
        }
        const icon = status == -1 ? require('../../assets/failure.json') : require('../../assets/success.json')
        setSrc(icon)
        if (status == -1) {
            setTextStatus('Đặt hàng thất bại!')
            return
        }
        setTextStatus('Đặt hàng thành công!')
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'ButtonNavigation' }],
            })
        }, 1400)
    }, [status])

    const create = async () => {
        try {
            const response = await createBill(data)
            if (response?.billId) {
                if (data.value) { payNow(data.value, response.billId) } else { setStatus(1) }
                clearListCart()
                setVoucher(null)
            } else {
                setStatus(-1)
            }

        } catch (error) {
            console.log('MomoScreen: ', error)
            setStatus(-1)
        }
    }

    const payNow = async (value, billId) => {
        let jsonData = {
            enviroment: "0", //"0": SANBOX , "1": PRODUCTION
            action: "gettoken", // DO NOT EDIT
            merchantname: "Etech - thiết bị di động",
            merchantcode: "123456",
            merchantNameLabel: "Etech",
            billdescription: "Thanh toán hóa đơn",
            amount: value, // order total amount
            orderId: new Date().getTime(),
            orderLabel: "Mã đơn hàng",
            appScheme: "momocgv20170101", // iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
        }

        if (Platform.OS === 'android') {
            let dataPayment = await RNMomosdk.requestPayment(jsonData)
            momoHandleResponse(dataPayment, billId)
        } else {
            RNMomosdk.requestPayment(jsonData)
        }
    }

    const momoHandleResponse = (response, billId) => {
        try {
            momo = 0
            if (response && response.status === 0) {
                // SUCCESS: continue to submit momoToken,phonenumber to server
                // let fromapp = response.fromapp // ALWAYS:: fromapp == momotransfer
                // let momoToken = response.data
                // let phonenumber = response.phonenumber
                // let message = response.message
                setStatus(2)
                updateStatusPaymentBill(billId)
            } else {
                // Has Error: show message here
                console.log('momoHandleResponse error')
                setStatus(3)
            }
        } catch (ex) {
            console.log('momoHandleResponse error: ', ex)
            setStatus(3)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <LottieView
                autoPlay
                style={{
                    width: 120,
                    height: 120,
                    backgroundColor: 'white',
                }}
                source={src}
            />
            <Text
                style={{ fontSize: 18, marginTop: 20 }}
            >{textStatus}</Text>
        </View>
    )
}

export default MoMoPaymentScreen
