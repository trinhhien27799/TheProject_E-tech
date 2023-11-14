import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StartRating from "../../Component/startRating";
import { Ionicons } from "@expo/vector-icons";
import { InfoProduct } from "./infoProduct";
import VariationsProduct from "./variationsProduct";
export default BodyProduts = ({ route }) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:20}}>{route.product_name}</Text>
            <Text style={{marginTop:5,marginBottom:5,color:'red',fontSize:17}}>{numberWithCommas(route.min_price)} đ</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {route.vote == 0 ? <Text>Chưa có đánh giá</Text> : <StartRating route={route.vote} />}
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="heart-outline" color="red" size={25} style={{ marginRight: 10 }} />
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
