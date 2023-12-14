import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import colors from "../colors";
import { getAllProduct } from "../CallApi/productApi";
import { useNavigation } from "@react-navigation/native";
import { formatPrice } from '../utils/format'
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ListPhone = () => {
    const [product, setProduct] = useState(null);
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Tất cả sản phẩm',
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.navigate('SearchScreen', { product: product })
                }}>
                    <Image source={require('../assets/search.png')} style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const getData = async () => {
        try {
            const dataOld = await AsyncStorage.getItem('product')
            if (dataOld) {
                setProduct(JSON.parse(dataOld))
            }
            const response = await getAllProduct()
            if (response != null && response.length > 0) {
                setProduct(response)
                AsyncStorage.setItem('product', JSON.stringify(response))
            }
        } catch (error) {
            console.log(`bestSeller: ${error}`)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const ListItem = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 15, paddingVertical: 15, backgroundColor: 'white', borderBottomWidth: 0.5, marginTop: 0.5, borderBottomColor: 'grey' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('DetailProducts', { productId: item._id }); }}>
                    <View style={styles.containerInfo}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.image_preview }} />

                        <View style={{
                            flex: 1,
                            marginRight: 15,
                            marginLeft: 15,
                            padding: 5,
                        }}>
                            <Text numberOfLines={2} style={{
                                color: 'black',
                                fontSize: 14,
                                marginTop: 5,
                                fontWeight: 'bold'
                            }}>{item.product_name}</Text>
                            <View style={styles.textPrice}>
                                <Text style={{ fontSize: 13, color: "red" }}>Giá: {formatPrice(item.max_price ? item.max_price : 0)}</Text>
                            </View>
                            <View style={styles.textCategory}>
                                <Text style={{ fontSize: 12, color: colors.grey }}>Hãng: {item.brand_name}</Text>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={product}
                keyExtractor={(item) => item._id}
                renderItem={ListItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        resizeMode: 'center',
        borderRadius: 8,
        justifyContent: "center"
    },
    containerInfo: {
        flexDirection: 'row',
    },
    textCategory: {
        marginTop: 5
    },
    textPrice: {
        marginTop: 10
    },
    container: {
        flex: 1,
    },
});

export default ListPhone;

