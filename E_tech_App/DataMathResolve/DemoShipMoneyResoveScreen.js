import React, { useState } from 'react'
import { View, Text } from 'react-native'
import tailwind from 'twrnc';
import {ShipMoneyResolve_City} from './ShipMoneyResolve'
import { getAllBill } from '../CallApi/billAPI';
import { getAllUserBill, getBill } from '../Model/BillModel';
import RatingStar from '../Component/RatingStar';
import ProductComment from '../Component/ProductComment';

const DemoShipMoneyResoveScreen = () => {
    const demoBill = getBill();

    console.log(productData);

    return (
        <View style={tailwind `flex-auto justify-center`}>
            <ProductComment/>
        </View>
    )
}

export default DemoShipMoneyResoveScreen