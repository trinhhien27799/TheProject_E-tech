import React, { useEffect, useState } from "react";
import { Image, Text, View,StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import colors from "../colors";
import ListItem from "../ListItem";
import data from '../items';
import { getAllProduct } from "../CallApi/productApi";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../utils/format'
import tailwind from "twrnc";
const ListPhone = () => {
    const [product, setProduct] = useState(null);
    const navigation = useNavigation();

    const getData = async () => {
        try {
          const rs = await getAllProduct()
          if (rs != null && rs.length > 0) {
            setProduct(rs)
            setTitle("Danh sách sản phẩm")
            setMore("Xem thêm")
          }
    
        } catch (error) {
          console.log(`bestSeller: ${error}`)
        }
      }
      useEffect(() => {
        getData()
      }, [])

    const ListItem = ({item}) => {
        return (
            <View style={tailwind `flex-1 p-5 w-96 border border-gray-300 mt-2 self-center bg-white rounded-lg`}>
                <TouchableOpacity onPress={() => {navigation.navigate('DetailProducts', { productId: item._id });}}>
                        <View style={styles.containerInfo}>
                            <Image
                                style={styles.image}
                                source={{uri: item.image_preview}} />
    
                            <View style={{
                                flex: 1,
                                marginRight: 15,
                                marginLeft:15,
                                padding: 5,
                            }}>
                                <Text numberOfLines={2} style={{
                                    color: 'black',
                                    fontSize: 14,
                                    marginTop:5,
                                    fontWeight: 'bold'
                                }}>{item.product_name}</Text>
                                    <View style={styles.textPrice}>
                                <Text style={{ fontSize: 13, color:"red" }}>Giá: {formatPrice(item.max_price ? item.max_price : 0)}</Text>
                                </View>
                                <View style={styles.textCategory}>
                                <Text style={{ fontSize: 12, color: colors.grey }}>Hãng: {item.brand_name}</Text>
                                </View>
                                {/* <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        color: colors.grey,
                                        fontSize: 12,
                                    }}>Trạng thái: </Text>
                                    <Text style={{
                                        color: item.status ? colors.conHang : colors.hetHang,
                                        fontSize: 12,
                                    }}>{item.quantity > 0 ? <Text>Còn hàng</Text> : <Text>Hết hàng</Text>} </Text>
                                </View> */}
                            </View>
                        </View>
                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.buttonCart}>
                                <AntDesign name="shoppingcart"  size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonBuy}>
                                    <Text style={{ color: 'white', fontWeight: "bold", fontSize: 13}}>Mua ngay</Text>
                                </TouchableOpacity>
                            </View>
                </TouchableOpacity>
                                
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={tailwind`bg-white flex-row py-3`}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={tailwind`bg-white p-1.5 rounded-full shadow-md ml-3`}
                >
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={tailwind`text-base mt-2 font-bold ml-3`}>Danh sách sản phẩm</Text>
            </View>
        <FlatList
            data={product}
            renderItem={ListItem}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
        borderRadius: 8,
        justifyContent:"center"
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent:'flex-end',
    },

    // Fix height & width
    buttonCart: {
        backgroundColor: colors.hetHang,
        borderRadius: 5,
        paddingTop:5,
        paddingBottom:5,
        width:50,
        alignItems: 'center',
    },
    buttonBuy:{
        backgroundColor: colors.hetHang,
        borderRadius: 5,
        width: 80,
        alignItems: 'center',
        justifyContent:"center",
        marginLeft:10,
    },
    containerInfo: {
        flexDirection: 'row',
     
    },
    containerItem:{
        flex: 1, 
        backgroundColor: 'white',
        marginTop:15,
        padding: 20
    },
    textCategory:{
        marginTop:5
    },
    textPrice:{
        marginTop:10
    },
    text:{
        fontSize:18,
        fontWeight:"bold",
        marginTop:20,
        marginBottom:10
    },
    container:{
        flex:1,
    },
});

export default ListPhone;

