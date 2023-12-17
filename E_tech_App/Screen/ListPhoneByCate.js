import React, { useState, useEffect } from "react"
import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { getAllProductByFilter, getItemProduct } from '../CallApi/productApi'
import tailwind from 'twrnc'
import { formatPrice } from '../utils/format'
import LottieView from 'lottie-react-native'


const ListPhone = ({ route }) => {
    const navigation = useNavigation()
    const data = route.params.data

    const [product, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            setLoading(true)
            const response = await getAllProductByFilter(data);
            setItems(response)
            changeTitePageDone(response.length)
        } catch (error) {
            changeTitePageLoading("Đã xảy ra lỗi")
            console.log(`ListProductByCate: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    const changeTitePageDone = (number) => {
        navigation.setOptions({
            headerTitle: `Tìm thấy ${number} sản phẩm`
        })
    }

    const changeTitePageLoading = (text) => {
        navigation.setOptions({
            headerTitle: text
        })
    }

    useEffect(() => {
        changeTitePageLoading("Đang tìm kiếm sản phẩm")
        getData()
    }, [])

    const handleItem = async ({item})=>{
        navigation.navigate('DetailProducts',{productId:item._id});
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.body}>
            {item.percent_discount > 0
                ? (
                    <View style={styles.saler}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
                            Giảm {item.percent_discount}%
                        </Text>
                    </View>
                ) :
                null
            }


            <TouchableOpacity onPress={() => { handleItem({item:item}) }}>
                <Image style={tailwind`w-35 h-28 self-center mt-4`} source={{ uri: item.image_preview }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={tailwind`mt-4 w-37`}>
                        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.product_name}</Text>
                        <Text style={{ marginTop: 5, marginBottom: 5 }}>Giá: {formatPrice(item.min_price ? item.min_price * (item.percent_discount != 0 ? (1 - item.percent_discount * 0.01) : 1) : 0)}</Text>
                        <Text style={{ marginTop: 5 }}>Hãng: {item.brand_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <LottieView
                autoPlay
                style={[styles.loading, { display: loading ? 'block' : 'none' }]}
                source={require('../assets/logo.json')}
            />
            <FlatList
                data={product}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 16,
        alignItems: 'center'
    },

    loading: {
        width: 45,
        height: 45,
    },

    body: {
        backgroundColor: 'white',
        margin: 10,
        width: 180,
        padding: 10,
        borderRadius: 20,
        shadowColor: 'grey',
        shadowRadius: 10,
        alignItems: 'center',
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
    img: {
        height: 100,
        width: 140,
        zIndex: 1,
        marginTop: 25,
    },
    viewIcon: {
        position: 'absolute',
        bottom: 0,
        right: 2,
        height: 30,
        width: 30,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    flatListContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})


export default ListPhone



