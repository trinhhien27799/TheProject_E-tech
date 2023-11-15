import React, { useState } from 'react'
import { View, Text } from 'react-native'
import tailwind from 'twrnc';
import {ShipMoneyResolve_City} from './ShipMoneyResolve'

const DemoShipMoneyResoveScreen = () => {
    const weight = 0.7;
    const distance = 1.5;
    const cityStatus = 1;

    let shipMoneyResult = 0;
    try {
        shipMoneyResult = ShipMoneyResolve_City(weight, cityStatus, distance);
    } catch (error) {
        console.log(error);
    }
    
    return (
        <View style={tailwind `flex-auto justify-center`}>
            <Text>Total: {shipMoneyResult}</Text>
        </View>
    )
}

export default DemoShipMoneyResoveScreen