import React, { useEffect, useState } from "react"
import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import tailwind from "twrnc"
import { getTypeProduct } from '../../CallApi/typeProduct'
import AsyncStorage from "@react-native-async-storage/async-storage"

const ListProduct = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const dataOld = await AsyncStorage.getItem('type_product')
            if (dataOld) {
                setData(JSON.parse(dataOld))
            }
            const response = await getTypeProduct()
            if (response != null && response.length > 0) {
                setData(response)
                AsyncStorage.setItem('type_product', JSON.stringify(response))
            }

        } catch (error) {
            console.log(`ListProduct : ${error}`)
        }
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })
        return unsubscribe
    }, [navigation])


    const renderItem = ({ item }) => {
        return (

            <TouchableOpacity onPress={() => navigation.navigate('ListPhoneByCate', {
                data: { id: item._id, route: "type-product" }
            })}>
                <View style={styles.viewItem}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <Text style={styles.textItem}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>


        )
    }
    return (
        <View style={styles.container}>
            {data.length > 0 && < Text style={styles.title}>Các loại sản phẩm</Text>}
            <FlatList

                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true} />
        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: "whitesmoke"
    },
    title: {
        marginStart: 8,
        marginTop: 16,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        width: 46,
        height: 46,
        resizeMode: 'cover',
    },
    viewItem: {
        backgroundColor: 'white',
        margin: 8,
        width: 100,
        height: 100,
        borderRadius: 10,
        shadowColor: 'black',
        shadowRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textItem: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: '500',
        overflow: 'hidden'
    }

})

export default ListProduct
