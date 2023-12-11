import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import RNMomosdk from 'react-native-momosdk';

const MoMoPaymentScreen = () => {

    const payNow = async () => {

        let jsonData = {
            enviroment: "0", //"0": SANBOX , "1": PRODUCTION
            action: "gettoken", // DO NOT EDIT
            merchantname: "CGV Cinemas",
            merchantcode: "CGV01",
            merchantNameLabel: "Nhà cung cấp",
            billdescription: "Fast and Furious 8",
            amount: 5000, // order total amount
            orderId: "ID20181123192300",
            orderLabel: "Ma don hang",
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
            console.log('OKKKO'+JSON.stringify(response))
            if (response && response.status === 0) {
                // SUCCESS: continue to submit momoToken,phonenumber to server
                let fromapp = response.fromapp; // ALWAYS:: fromapp == momotransfer
                let momoToken = response.data;
                let phonenumber = response.phonenumber;
                let message = response.message;
            } else {
                // Has Error: show message here
            }
        } catch (ex) { }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={payNow}>
                <Text>Make Payment</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MoMoPaymentScreen;
