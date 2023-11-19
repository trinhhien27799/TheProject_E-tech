import React, { useState } from 'react'
import { View, Text } from 'react-native'
import tailwind from 'twrnc';
import {ShipMoneyResolve_City} from './ShipMoneyResolve'
import { getAllBill } from '../CallApi/billAPI';
import { getBill } from '../Model/BillModel';
import RatingStar from '../Component/RatingStar';

const DemoShipMoneyResoveScreen = () => {
    const demoBill = getBill();
    console.log(demoBill);

    return (
        <View style={tailwind `flex-auto justify-center`}>
            <RatingStar/>
        </View>
    )
}

export default DemoShipMoneyResoveScreen