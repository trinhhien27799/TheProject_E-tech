import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import { formatPrice } from "../../utils/format"
import { addCart } from "../../CallApi/cartApi"
import LottieView from 'lottie-react-native'
import { pushListCart, clearListCart, getProductSelected, getUser } from '../../session'
import { useNavigation } from "@react-navigation/native"
import tailwind from "twrnc"
import { useRequireLogin } from "../../utils/alert"
const ViewModal = ({ product_name, data, setIsModalVisible, option }) => {
    const navigation = useNavigation()
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)

    const handleAdd = async () => {
        try {
            setLoading(true)
            const newCart = { variations_id: data._id, quantity: quantity }
            const response = await addCart(newCart)
            if (response?._id != null) {
                setIsModalVisible(false)
                setLoading(false)
                if (option) {
                    clearListCart()
                    response.image = data.image
                    response.price = data.price
                    response.product_name = product_name
                    response.percent_discount = getProductSelected()?.percent_discount ?? 0
                    pushListCart(response)
                    navigation.navigate('PayScreen')
                }
                console.log("Thêm giỏ hàng thành công")
            } else {
                setIsModalVisible(true)
                setLoading(false)
                console.log("Thêm giỏ hàng thất bại")
            }
        } catch (error) {
            console.log(`AddCart: ${error}`)
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: data.image }} style={styles.image} />
                <View style={styles.viewName}>
                    <Text style={{ fontWeight: '500' }}>{product_name}</Text>
                    <Text style={styles.price}>Màu sắc: {data.color}</Text>
                    {data.ram && <Text style={styles.price}>Phiên bản: {data.ram}/{data.rom}</Text>}
                    <Text style={styles.price}>Có sẵn: {data.quantity}</Text>
                </View>
            </View>





            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }}
                >
                    <Image source={require('../../img/minus.png')} style={{ height: '80%', width: '80%' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginHorizontal: 10 }}>
                    {quantity}
                </Text>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                        if (quantity < data.quantity) {
                            setQuantity(quantity + 1)
                        }
                    }}
                >
                    <Image source={require('../../img/plus.png')} style={{ height: '80%', width: '80%' }} />

                </TouchableOpacity>
            </View>
            {loading ?
                <LottieView
                    autoPlay
                    style={{ width: 40, height: 40, marginBottom: 10, alignSelf: 'center' }}
                    source={require('../../assets/logo.json')}
                />
                :
                <TouchableOpacity
                    style={[tailwind`bg-blue-600 w-50 rounded-lg shadow-md my-3`, { alignSelf: 'center', paddingVertical: 10 }]}
                    onPress={() => {
                        if (!getUser()) {
                            useRequireLogin(navigation)
                        } else {
                            handleAdd()
                        }
                    }}
                >
                    <Text style={tailwind` font-bold text-white self-center`}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        paddingVertical: 15
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'center',
        borderRadius: 10,
    },
    viewName: {
        justifyContent: 'center',
        flex: 1
    },
    price: {
        fontSize: 11,
        fontWeight: '400'
    },
    quantityButton: {
        width: 24,
        height: 24,
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
})

export default ViewModal
