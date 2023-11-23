import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StartRating from "../../Component/startRating";
import { Ionicons } from "@expo/vector-icons";
import { InfoProduct } from "./infoProduct";
import VariationsProduct from "./variationsProduct";
import { formatPrice } from "../../utils/format";
import useLikeToggle from "../../Component/hooks/useLikeToggle";
export default BodyProduts = ({ route,setDataTest,price }) => {
    const {checkHeart,handleUnlike} = useLikeToggle(route._id);
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:20}}>{route.product_name}</Text>
            <Text style={{marginTop:5,marginBottom:5,color:'red',fontSize:17}}>{formatPrice(price)}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {route.vote == 0 ? <Text>Chưa có đánh giá</Text> : <StartRating route={route.vote} />}
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
            <VariationsProduct route={route} setDataTest={setDataTest}/>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10,
    }
});
