import React, { useEffect, useState } from "react";
import { Image, Text, View,StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import colors from "../colors";
import ListItem from "../ListItem";
import data from '../items';
import { getAllProduct } from "../CallApi/productApi";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { formatPrice } from '../utils/format'
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
            <View style={styles.containerItem}>
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
                            <View style={{
                                    height: 0.5,
                                    backgroundColor: colors.grey,
                                    marginTop: 20
                                }}></View>
                </TouchableOpacity>
                                
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Danh sách sản phẩm</Text>
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
        marginTop:15
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
        marginTop:50,
        marginBottom:10
    },
    container:{
        paddingHorizontal:10,
        flex:1,
        backgroundColor:"white"
    },
});

export default ListPhone;

