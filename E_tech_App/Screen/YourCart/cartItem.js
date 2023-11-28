import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { formatPrice } from '../../utils/format'
import { useNavigation } from '@react-navigation/native'
import { updateCart } from '../../CallApi/cartApi'
import Checkbox from 'expo-checkbox'
import { pushListCart, deleteItemInListCart, getListCart, updateItemInCart } from '../../session'


const CartItem = ({ item, index, setShow, setUpdate, clear, setData, data }) => {

    const [quanItem, setQuanItem] = useState(item.quantity)
    const [priceItem, setPriceItem] = useState(item.quantity * item.price * (1 - item.percent_discount / 100))
    const [isChecked, setChecked] = useState(false);

    const navigation = useNavigation()

    const updateQuantity = async (quantity) => {
        try {
            const data = { cart_id: item._id, quantity: quantity }
            const response = await updateCart(data)
            console.log(response)
        } catch (error) {
            console.log(`CartItem :${error}`)
        }
    }

    useEffect(() => {
        setPriceItem(quanItem * item.price * (1 - item.percent_discount / 100))
        data.map((_, i, array) => {
            if (index == i) {
                array[i].quantity = quanItem
            }
        })
        setData(data)
    }, [quanItem])

    useEffect(() => {
        setChecked(false)
    }, [clear])

    const eventChecked = (checked) => {
        setChecked(checked)
        if (checked) {
            pushListCart(item)
        } else {
            deleteItemInListCart(item)
        }
        const show = getListCart().length > 0
        setShow(show)
        setUpdate(new Date().getTime())
    }

    const minusFunc = (newQuantity) => {
        updateItemInCart({ id: item._id, quantity: newQuantity })
        setQuanItem(newQuantity)
        updateQuantity(newQuantity)
        setUpdate(new Date().getTime())
    }

    const plusFunc = (newQuantity) => {
        updateItemInCart({ id: item._id, quantity: newQuantity })
        setQuanItem(newQuantity)
        updateQuantity(newQuantity)
        setUpdate(new Date().getTime())
    }

    const handleItem = async () => {
        navigation.navigate('DetailProducts', { productId: item.product_id })
    }

    return (
        <View style={styles.dataItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ alignItems: 'center' }}
                    onPress={handleItem}>
                    <Image style={styles.imgItem} source={{ uri: item.image }} />
                </TouchableOpacity>

                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={styles.textName}>{item.product_name}</Text>
                    <Text style={[{ color: 'grey' }]}>Kho: {item.max_quantity}</Text>
                    <Text style={[{ color: 'red' }]}>{formatPrice(item.price * (1 - item.percent_discount / 100))}</Text>
                </View>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={(checked) => {
                    eventChecked(checked)
                }} />
            </View>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', width: 80, justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (quanItem > 1) {
                                minusFunc(quanItem - 1)
                            }
                        }}
                        style={styles.viewButton}>
                        <Image style={styles.button}
                            source={require('../../assets/plus.png')}
                        />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, marginHorizontal: 7 }}>{quanItem}</Text>

                    <TouchableOpacity
                        onPress={() => {
                            if (quanItem < item.max_quantity) {
                                plusFunc(quanItem + 1)
                            }
                        }}
                        style={styles.viewButton}>
                        <Image style={styles.button}
                            source={require('../../assets/plus.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }} />
                <Text style={{ fontSize: 16, color: 'red' }}>Thành tiền: {formatPrice(priceItem)}</Text>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    dataItem: {
        width: '100%',
        flexGrow: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D5D5D5',
        paddingVertical: 10
    },
    imgItem: {
        width: 80,
        height: 80,
        borderRadius: 8,
        resizeMode: 'contain',
        marginBottom: 8
    },
    textName: {
        fontSize: 18,
        fontWeight: '500',
        overflow: 'hidden'
    },

    button: {
        width: 14,
        height: 14,
        resizeMode: 'center'
    },
    viewButton: {
        backgroundColor: '#bbbbbb',
        padding: 4,
        borderRadius: 2
    },
    checkbox: {
        margin: 8,
        width: 25,
        height: 25
    },
})


