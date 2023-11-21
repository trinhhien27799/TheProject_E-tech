import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StartRating from "../../Component/startRating";
import { Ionicons } from "@expo/vector-icons";
import { InfoProduct } from "./infoProduct";
import VariationsProduct from "./variationsProduct";
import { formatPrice } from "../../utils/format";
import useLikeToggle from "../../Component/hooks/useLikeToggle";
export default BodyProduts = ({ route }) => {
    const {checkHeart,handleUnlike} = useLikeToggle(route.dataItem._id);
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:20}}>{route.dataItem.product_name}</Text>
            <Text style={{marginTop:5,marginBottom:5,color:'red',fontSize:17}}>{formatPrice(route.dataItem.min_price)}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {route.dataItem.vote == 0 ? <Text>Chưa có đánh giá</Text> : <StartRating route={route.dataItem.vote} />}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                    onPress={handleUnlike}
                    >
                    {
                        checkHeart?
                        <Ionicons name="heart" color="red" size={25} style={{ marginRight: 10 }} />
                        :<Ionicons name="heart-outline" color="red" size={25} style={{ marginRight: 10 }} />
                    }
                    </TouchableOpacity>
                    <Ionicons name="share-social-outline" size={25} />
                </View>
            </View>
            <InfoProduct />
            <VariationsProduct route={route}/>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10,
    }
});
