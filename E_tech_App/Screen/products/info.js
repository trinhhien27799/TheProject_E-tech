import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StartRating from "../../Component/startRating";
import { Ionicons } from "@expo/vector-icons";
import { formatPrice } from "../../utils/format";
import { handleLike } from '../../CallApi/productApi'
import { getUser } from "../../session";
import { useRequireLogin } from "../../utils/alert";
import { useNavigation } from "@react-navigation/native";


const Info = ({ productId, productName, minPrice, maxPrice, percentDiscount, vote, isLike }) => {

    const [like, setLike] = useState(isLike)
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const navigation = useNavigation()
    const onClick = async (boolean) => {
        try {
            const user = getUser()
            if (!user) {
                alert('Đăng nhập để tiếp tục')
                return
            }
            const response = await handleLike(boolean, productId)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const min = minPrice * (1 - percentDiscount / 100)
        const max = maxPrice * (1 - percentDiscount / 100)
        var txt1 = formatPrice(min)
        if (max > min) txt1 += ` - ${formatPrice(max)}`
        setText1(txt1)
        if (percentDiscount > 0) {
            var txt2 = formatPrice(minPrice)
            if (maxPrice > minPrice) txt2 += ` - ${formatPrice(maxPrice)}`
            setText2(txt2)
        }
    }, [])
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{productName}</Text>
            <View style={{ paddingVertical: 10 }}>
                <Text style={{ color: 'red', fontSize: 17 }}>{text1}</Text>
                <Text style={{ color: 'grey', fontSize: 17, textDecorationLine: 'line-through' }}>{text2}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {vote == 0 ? <Text>Chưa có đánh giá cho sản phẩm này</Text> : <StartRating route={vote} size={28} />}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!getUser()) {
                                useRequireLogin(navigation)
                            } else {
                                onClick(!like)
                                setLike(!like)
                            }
                        }}
                    >
                        {
                            like ?
                                <Ionicons name="heart" color="red" size={28} style={{ marginRight: 10 }} />
                                : <Ionicons name="heart-outline" color="red" size={28} style={{ marginRight: 10 }} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default Info
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10,
        marginHorizontal: 4
    }
});
