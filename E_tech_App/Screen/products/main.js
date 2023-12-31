
import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Dimensions, SectionList } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { getItemProduct } from "../../CallApi/productApi"
import LoadingWidget from "../../Component/loading"
import Variations from "./variation"
import Description from "./description"
import Rule from "./rule"
import HeaderProduct from "./header"
import FooterProduct from "./footer"
import Info from "./info"
import Comment from "./comment"
import Related from "./related"
import AsyncStorage from "@react-native-async-storage/async-storage"


const DetailPoducts = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            const productId = route.params.productId
            const response = await getItemProduct(productId)
            if (response.variations.length > 0) setProduct(response)
            var newArrayRecent = []
            const arraytRecent = await AsyncStorage.getItem('product_recent')
            if (arraytRecent) {
                newArrayRecent = JSON.parse(arraytRecent).filter(item => item._id !== response._id)
            }
            newArrayRecent.unshift(response)
            const save = newArrayRecent.slice(0, 7)
            AsyncStorage.setItem('product_recent', JSON.stringify(save))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const data = [
        { type: 0 },
        { type: 1 },
        { type: 2 },
        { type: 3 },
        { type: 4 },
        { type: 5 },
        { type: 6 }
    ]
    const sections = [{ data, key: 'section' }]

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 0:
                return <HeaderProduct variations={product.variations} />
            case 1:
                return <Info sold={product.sold} productId={product._id} productName={product.product_name} minPrice={product.min_price} maxPrice={product.max_price} percentDiscount={product.percent_discount} vote={product.vote} isLike={product.like} />
            case 2:
                return <Rule />
            case 3:
                return <Variations variations={product.variations} product_name={product.product_name} percent_discount={product.percent_discount} />
            case 4:
                return <Related productId={product._id} />
            case 5:
                return <Description description={product.description} />
            case 6:
                return <Comment productId={product._id} product={product} />
            default:
                return null
        }
    }

    return (
        <View style={styles.container}>
            {
                loading ?
                    <LoadingWidget /> :
                    (
                        product != null ?
                            <>
                                <SectionList
                                    sections={sections}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderItem}
                                />
                                <FooterProduct product_name={product.product_name} />
                            </>
                            :
                            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                <Text>Không có thông tin sản phẩm này</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.goBack()
                                    }}>
                                    <Text style={{ color: 'grey' }}>Quay lại trang chủ.</Text>
                                </TouchableOpacity>
                            </View>
                    )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default DetailPoducts
