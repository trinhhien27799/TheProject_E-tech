import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StartRating from "../../Component/startRating";
import { Ionicons } from "@expo/vector-icons";
import { formatPrice } from "../../utils/format";
import { handleLike } from '../../CallApi/productApi'
import { getUser } from "../../session";


const BodyProduts = ({ productId, productName, price, vote, isLike }) => {

    const [like, setLike] = useState(isLike)
    const onClick = async (boolean) => {
        try {
            const user = getUser()
            if (!user) {
                alert('Đăng nhập để tiếp tục')
                return
            }
            const response = await handleLike(boolean, productId)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{productName}</Text>
            <Text style={{ marginTop: 5, marginBottom: 5, color: 'red', fontSize: 17 }}>{formatPrice(price)}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {vote == 0 ? <Text>Chưa có đánh giá</Text> : <StartRating route={vote} />}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            onClick(!like)
                            setLike(!like)
                        }}
                    >
                        {
                            like ?
                                <Ionicons name="heart" color="red" size={25} style={{ marginRight: 10 }} />
                                : <Ionicons name="heart-outline" color="red" size={25} style={{ marginRight: 10 }} />
                        }
                    </TouchableOpacity>
                    <Ionicons name="share-social-outline" size={25} />
                </View>
            </View>
        </View>

    )
}

export default BodyProduts
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10,
        marginHorizontal:4
    }
});
