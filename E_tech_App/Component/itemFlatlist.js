import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "./startRating"; // Assuming it's a correct component name
import { Ionicons } from "@expo/vector-icons";
import { getItemProduct, toggleLike } from "../CallApi/productApi";
import { useNavigation } from "@react-navigation/native";
import { formatPrice } from "../utils/format";


const ItemFlatlist = ({ route }) => {
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
  const handleItem = async ()=>{
    const dataItem = await getItemProduct({product_id:route._id});
    navigation.navigate('DetailPoducts',{route,dataItem});
  }
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
    onPress={()=>{
      handleItem();
    }}
    style={styles.item} key={route._id}>
      <Image style={styles.image} source={{ uri: route.image_preview }} />
      <Text style={styles.productName}>{route.product_name}</Text>
      <Text style={styles.textPrice}>{formatPrice(route.min_price)}</Text>
      {
      route.min_price == route.max_price ? null:
      <Text style={styles.discountedPrice}>{formatPrice(route.max_price)}</Text>
      }
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {route.vote === 0 ? <Text >Chưa có đánh giá</Text> : <StarRating route={route.vote} />}
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
    // backgroundColor: '#e0e0e0',
    borderColor:'grey',
    borderWidth:1,
    borderRadius: 8,
    width: '45%',
    height: 300,
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
    marginTop: '5%',
    color: 'red', 
  },
  discountedPrice: {
    fontSize: 12,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
});

export default ItemFlatlist;
