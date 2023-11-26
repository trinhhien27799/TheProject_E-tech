
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import FooterProduct from "./footerProduct"
import BodyProducts from "./bodyProducts"
import colors from "../../Component/colors"
import { useNavigation, useRoute } from "@react-navigation/native"
import { getItemProduct } from "../../CallApi/productApi"
import LoadingWidget from "../../Component/loading"
import VariationsProduct from "./variationsProduct"
import { InfoProduct } from "./info"
import { Rule } from "./rule"
const DetailPoducts = () => {
    const route = useRoute()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [dataTest, setDataTest] = useState(null)
    const [image, setImage] = useState(null)
    const [borderIndex, setBorderIndex] = useState(null)
    const navigation = useNavigation()

    const getData = async () => {
        try {
            const productId = route.params.productId
            const response = await getItemProduct(productId)
            setProduct(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setImage(dataTest ? dataTest.image : product.image_preview)
    }, [dataTest, product])


    const data = [
        { type: 0 },
        { type: 1 },
        { type: 2 },
        { type: 3 }
    ]
    const sections = [{ data, key: 'section' }]

    
    return (
        <View style={styles.container}>
            {
                loading ?
                    <LoadingWidget isLoading={loading} /> :
                    <LoadingWidget /> :
                    <>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.viewImage}>
                                    <Image style={styles.imagePd} source={{ uri: image }} />
                                </View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {
                                        variations.map((item, index) => (
                                       product.variations.map((item, index) => (

                                            <TouchableOpacity
                                                onPress={() => {
                                                    setImage(item.image)
                                                    setBorderIndex(index)
                                                }}
                                            >
                                                <Image
                                                    key={index}

                                                    style={{ height: 100, width: 100, margin: 5, borderRadius: 15, borderColor: borderIndex == index ? colors.blue : null }} />

                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>

                                <TouchableOpacity
                                    style={styles.viewPrevious}
                                    onPress={() => {
                                        navigation.goBack()

                                    }}
                                >
                                    <Ionicons name="arrow-back" size={20} />
                                </TouchableOpacity>
                            </View>

                            <BodyProducts productId={product._id} productName={product.product_name} price={product.min_price} vote={product.vote} isLike={product.like}/>
                            <Rule />
                            <VariationsProduct variations={product.variations} />
                            <InfoProduct description={product.description} />
                        </ScrollView>
                        <FooterProduct/>
                    </>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'linear-gradient(to bottom, #87CEEB, #FFFFFF)',
    },
    imagePd: {
        flex: 1,
        resizeMode: 'cover'
    },
    viewPrevious: {
        position: 'absolute',
        width: 40,
        marginTop: '10%',
        margin: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewImage: {
        height: Dimensions.get('window').height * 0.5,
        width: '100%',
    }
})

export default DetailPoducts
