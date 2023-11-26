import React from 'react'
import { View, Image, Text } from 'react-native';
import tailwind from 'twrnc';

const completeValue = (imgUri, statusText, imgStyle, textStyle) => {
    return(
        <View style={tailwind `flex-row justify-end`}>
            <Image 
                source={imgUri}
                style={tailwind `${imgStyle}`}
            />
            <Text style={tailwind `${textStyle}`}>{statusText}</Text>
        </View>
    )
}

const OrderStatusSet = ({ statusNum }) => {
    switch (statusNum) {
        case 0:
            return(completeValue(require('../img/statusIcon/wait_img.png'), "Đang xác nhận", 'w-5 h-5 mr-2'));
            break;
        case 1:
            return(completeValue(require('../img/statusIcon/ship_img.png'), "Đang giao hàng", 'w-7 h-5 mr-2'));
            break;
        case 2:
            return(completeValue(require('../img/statusIcon/check_img.png'), "Hoàn thành", 'w-5 h-5 mr-2'));
            break;
        case -1:
            return(completeValue(require('../img/statusIcon/delete_3221897.png'), "Đã hủy", 'w-7 h-7 mr-2', 'mt-1'));
            break;
    }
}

export default OrderStatusSet