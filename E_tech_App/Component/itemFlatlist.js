import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import StarRating from "./startRating"; 
import { useNavigation } from "@react-navigation/native";
import { formatPrice } from "../utils/format";
import tailwind from 'twrnc'
import StartRating from "./startRating";

const ItemFlatlist = ({ route }) => {
  const navigation = useNavigation();
  const handleItem = async ()=>{
    navigation.navigate('DetailProducts', { productId: route._id });
  }
  return (
    <View style={styles.body}>
        {route.percent_discount > 0
          ? (
            <View style={styles.saler}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
                Giảm {route.percent_discount}%
              </Text>
            </View>
          ) :
          null
        }


        <TouchableOpacity onPress={handleItem}>
          <Image style={tailwind`w-35 h-28 self-center mt-4`} source={{ uri: route.image_preview }} />
          <View style={{ flexDirection: 'row' }}>
            <View style={tailwind`mt-4 w-37`}>
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{route.product_name}</Text>
              <Text style={{ marginTop: 5, marginBottom: 5 }}>Giá: {formatPrice(route.min_price ? route.min_price * (route.percent_discount != 0 ? (1 - route.percent_discount * 0.01) : 1) : 0)}</Text>
              {route.vote == 0 ? <Text>Chưa có đánh giá</Text> : <StartRating route={route.vote} size={15}/>}
            </View>

          </View>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width / 2 - 16,
    height: 270,
    borderRadius: 10,
    shadowColor: 'grey',
    shadowRadius: 7,
    alignItems: 'center',
    shadowOpacity: 0.8,
    margin: 6
  },
  saler: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 75,
    height: 35,
    backgroundColor: 'red',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 10,
    zIndex: 2,
  },
});

export default ItemFlatlist;
