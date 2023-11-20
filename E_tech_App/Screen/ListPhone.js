import React, { useEffect, useState } from "react";
import { Image, Text, View,StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import colors from "../colors";
import ListItem from "../ListItem";
import data from '../items';
import { getAllProduct } from "../CallApi/productApi";
import { useNavigation } from "@react-navigation/native";

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
            <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
                <TouchableOpacity onPress={() => {navigation.navigate('ProductDetail', {product: item})}}>
                    <View>
                        <View style={styles.view}>
                            
                            <Image
                                style={styles.image}
                                source={{uri: item.image_preview}} />
    
                            <View style={{
                                flex: 1,
                                marginRight: 15,
                                padding: 5,
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>{item.product_name}</Text>
    
                                <View style={{
                                    height: 1,
                                    backgroundColor: colors.grey,
                                    marginTop: 5
                                }}></View>
    
                                <Text style={{ fontSize: 12, color: colors.grey }}>Giá: {item.max_price}</Text>
                                <Text style={{ fontSize: 12, color: colors.grey }}>Hãng: {item.brand_name}</Text>
    
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
    
                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={{ color: 'white', lineHeight: 29.7, fontWeight: "bold", fontSize: 12 }}>Mua ngay</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: "bold", fontSize: 12 }}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <FlatList
            data={product}
            renderItem={ListItem}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
        borderRadius: 8,
        marginRight: 15,
        marginTop: 8
    },
    view: {
        height: 150,
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: 'row',
        marginVertical: 6,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        shadowRadius: 10,
    },
    viewButton: {
        // backgroundColor:'red',
        flex: 0.5,
        margin: 10,
        alignItems: 'center',
    },

    // Fix height & width
    button: {
        backgroundColor: colors.hetHang,
        borderRadius: 10,
        padding: 5,
        width: 90,
        marginBottom: 5,
        marginRight: 10,
        alignItems: 'center',
        height: 45
    }
});

export default ListPhone;

