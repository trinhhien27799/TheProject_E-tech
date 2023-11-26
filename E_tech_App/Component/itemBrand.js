import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "./startRating"; // Assuming it's a correct component name
import { Ionicons } from "@expo/vector-icons";
import { toggleLike } from "../CallApi/productApi";
import { formatPrice } from "../utils/format";
import { useNavigation } from "@react-navigation/native";
import useItemProduct from "./hooks/useItemProducts";

const IteamBrand = ({ route }) => {
  
    const [checkHeart, setCheckHeart] = useState(false);
  useEffect(() => {
    const fectData = async () => {
      const resultCheckLike = await toggleLike({ product_id: route._id, action: 'check' });
      setCheckHeart(resultCheckLike)
    };
    fectData();
  }, []);
  const handleLike = async () => {
    if (!checkHeart) {
      setCheckHeart(true);
      await toggleLike({ product_id: route._id, action: 'add' });
    }else{
      setCheckHeart(false);
      await toggleLike({ product_id: route._id, action: 'delete' });

    }
  }
  const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.item} onPress={()=>{
          navigation.goBack();
          navigation.navigate('DetailPoducts',{route:route});
        }}>
            <Image style={styles.image} source={{ uri: route.image_preview }} />
            <Text style={styles.productName}>{route.product_name}</Text>
            <Text style={styles.textPrice}>{formatPrice(route.min_price)}</Text>
            <Text style={styles.discountedPrice}>{formatPrice(route.max_price)}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {route.vote === 0 ? null : <StarRating route={route.vote} />}
                <TouchableOpacity
                    onPress={handleLike}
                >
                    {
                        checkHeart ? <Ionicons name="heart" size={15} color="red" /> : <Ionicons name="heart-outline" size={15} color="red" />
                    }
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width:180,
    height:250
    },
    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
        marginBottom: '5%',
    },
    productName: {
        fontSize: 15,
        marginTop: '5%',
    },
    textPrice: {
        fontWeight: 'bold',
        marginTop: '2%',
        color: 'red',
    },
    discountedPrice: {
        fontSize: 12,
        color: 'grey',
        textDecorationLine: 'line-through',
    },
});

export default IteamBrand;
