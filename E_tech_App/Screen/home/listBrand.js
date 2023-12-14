import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { getBrand } from '../../CallApi/brand'
import AsyncStorage from "@react-native-async-storage/async-storage"

const ListBrand = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const dataOld = await AsyncStorage.getItem('brand')
            if (dataOld) {
                setData(JSON.parse(dataOld))
            }
            const response = await getBrand()
            if (response != null && response.length > 0) {
                setData(response)
                AsyncStorage.setItem('brand', JSON.stringify(response))
            }
        } catch (error) {
            console.log(`ListBrand : ${error}`)
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
                data: { id: item._id, route: "brand" }
            })}>
                <View style={styles.viewItem}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                </View>
            </TouchableOpacity>

        )
    }
    return (
        <View style={styles.container}>
            {data.length > 0 && <Text style={styles.title}>Các hãng sản phẩm</Text>}
            <FlatList

                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        flex: 1,
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
        width: 70,
        height: 70,
        resizeMode: 'contain',
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

})

export default ListBrand
