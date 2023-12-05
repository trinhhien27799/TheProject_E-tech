import React, { useState } from 'react'
import { View, Text } from 'react-native'
import tailwind from 'twrnc';
import {ShipMoneyResolve_City} from './ShipMoneyResolve'
import { getAllBill } from '../CallApi/billApi';
import { getAllUserBill, getBill } from '../Model/BillModel';
import RatingStar from '../Component/RatingStar';
import PreviewComment from '../Component/PreviewComment';
import CommentRemix from '../Screen/products/comment_remix';

const DemoShipMoneyResoveScreen = () => {
    return (
        <View style={tailwind `flex-auto justify-center`}>
           <CommentRemix productId={'655534755515ec3c61314304'}/>
        </View>
    )
}

export default DemoShipMoneyResoveScreen