import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import RNMomosdk from 'react-native-momosdk';
import LottieView from 'lottie-react-native'
import { createBill } from '../../CallApi/billApi';

const MoMoPaymentScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const data = route.params.data
    const [status, setStatus] = useState(null)
    const [src, setSrc] = useState(require('../../assets/logo.json'))

    useEffect(() => {
        try {
            if (data.value) { payNow(data.value) } else { create() }
        } catch (error) {
            console.log('MomoScreen: ', error)
            setStatus(response?.message != null)
        }

    }, [])

    useEffect(() => {
        if (status != null) setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'ButtonNavigation' }],
            });
        }, 3000)
    }, [status])

    const create = async () => {
        try {
            const response = await createBill(data)
            if (response?.message) {
                setStatus(true)
                clearListCart()
                setSrc(require('../../assets/success.json'))
            } else {
                setStatus(false)
                setSrc(require('../../assets/failure.json'))
            }

        } catch (error) {
            console.log('MomoScreen: ', error)
            setStatus(response?.message != null)
            setSrc(require('../../assets/failure.json'))
        }
    }

    const payNow = async (value) => {

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
        };

        if (Platform.OS === 'android') {
            let dataPayment = await RNMomosdk.requestPayment(jsonData);
            momoHandleResponse(dataPayment);
        } else {
            RNMomosdk.requestPayment(jsonData);
        }
    };

    const momoHandleResponse = (response) => {
        try {
            if (response && response.status === 0) {
                // SUCCESS: continue to submit momoToken,phonenumber to server
                // let fromapp = response.fromapp; // ALWAYS:: fromapp == momotransfer
                // let momoToken = response.data;
                // let phonenumber = response.phonenumber;
                // let message = response.message;
                data.payment_method = "Thanh toán bằng momo"
                create()
            } else {
                // Has Error: show message here
                console.log('momoHandleResponse error')
                setStatus(false)
                setSrc(require('../../assets/failure.json'))
            }
        } catch (ex) {
            console.log('momoHandleResponse error: ', ex)
            setStatus(false)
            setSrc(require('../../assets/failure.json'))
        }
    };

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
            >{status == null ? 'Đang tiến hành thanh toán' : status == false ? 'Thanh toán thất bại!' : 'Thanh toán thành công'}</Text>
        </View>
    );
}

export default MoMoPaymentScreen;
