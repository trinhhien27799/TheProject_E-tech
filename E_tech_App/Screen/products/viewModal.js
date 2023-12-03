import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import { formatPrice } from "../../utils/format"
import { addCart } from "../../CallApi/cartApi"
import LottieView from 'lottie-react-native'
import { pushListCart, clearListCart } from '../../session'
import { useNavigation } from "@react-navigation/native"
const ViewModal = ({ data, setIsModalVisible, option }) => {

    const navigation = useNavigation()
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)

    const handleAdd = async () => {
        try {
            setLoading(true)
            const newCart = { variations_id: data._id, quantity: quantity }
            const response = await addCart(newCart)
            if (!!response._id) {
                setIsModalVisible(false)
                setLoading(false)
                if (option) {
                    clearListCart()
                    pushListCart()
                    navigation.navigate('NewOrderScreen')
                }
                navigation.navigate('Cart')
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
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        setIsModalVisible(false)
                    }}>
                    <Ionicons name="close" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: data.image }} style={styles.image} />
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{formatPrice(data.price)}</Text>
                <Text >Kho: {data.quantity}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.title}>Màu sắc</Text>
                <View style={styles.viewItem}>
                    <Text>{data.color}</Text>
                </View>
            </View>
            {
                data.ram &&
                <View style={styles.infoItem}>
                    <Text style={styles.title}>Dung lượng</Text>
                    <View style={styles.viewItem}>
                        <Text>{data.ram}/{data.rom}</Text>
                    </View>
                </View>

            }
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: 100, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1)
                            }
                        }}
                    >
                        <Image source={require('../../img/minus.png')} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {quantity}
                    </Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => {
                            setQuantity(quantity + 1)
                        }}
                    >
                        <Image source={require('../../img/plus.png')} style={{ height: 30, width: 30 }} />

                    </TouchableOpacity>
                </View>
            </View>
            {loading ?
                    <LottieView
                        autoPlay
                        style={{ width: 40, height: 40, marginTop: 10 }}
                        source={require('../../assets/logo.json')}
                    />
                :
                <TouchableOpacity
                    style={{ backgroundColor: '#1E90FF', alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16, marginTop: 20 }}
                    onPress={() => {
                        handleAdd()
                    }}
                >
                    <Text style={{ fontSize: 20 }}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
    },
    header: {
        position: 'relative',
        top: 8,
        right: -1 * Dimensions.get('window').width * 0.45
    },
    image: {
        borderWidth: 2,
        height: 100,
        width: 100,
        resizeMode: 'contain',
        borderRadius: 10,
        alignSelf: 'center'
    },
    priceContainer: {
        alignItems: 'center',
    },
    price: {
        color: "red",
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoItem: {
        marginBottom: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    viewItem: {
        height: 40,
        width: Dimensions.get("window").width - 100,
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#1E90FF',
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
})

export default ViewModal
