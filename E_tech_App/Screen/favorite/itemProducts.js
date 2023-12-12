import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from "react-native"
import StarRating from "../../Component/startRating" // Assuming it's a correct component name
import { Ionicons } from "@expo/vector-icons"
import { formatPrice } from "../../utils/format"
import Checkbox from "expo-checkbox"

const IteamProduct = ({ item, navigation, list, setList }) => {
    const [isChecked, setChecked] = useState(false)
    console.log(item)

    useEffect(() => {
        if (list.length == 0) setChecked(false)
    }, [list])

    const eventChecked = (checked) => {
        setChecked(checked)
        var newList = []
        if (checked) {
            newList = [...list, item._id]
        } else {
            newList = list.filter(i => i !== item._id)
        }
        setList(newList)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('DetailProducts', { productId: item._id })
                }}
            >
                <Image
                    source={{ uri: item.image_preview }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <View style={styles.viewChild}>
                <Text style={styles.name}>{item.product_name}</Text>
            </View>
            <Checkbox
                style={styles.Checkbox}
                value={isChecked}
                onValueChange={(checked) => {
                    eventChecked(checked)
                }}
            />
        </View>
    )
}


export default IteamProduct
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        resizeMode:'center'
    },
    viewChild: {
        justifyContent: 'center',
        marginHorizontal: 10,
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16
    },
    price: {
        fontWeight: '400',
        fontSize: 16,
        color: 'red'
    },
    Checkbox: {
        width: 25,
        height: 25
    }
})


