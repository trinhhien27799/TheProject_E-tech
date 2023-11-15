import React, { useEffect, useState } from "react"
import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import tailwind from "twrnc"
import { getBrand } from '../../CallApi/brand'

const ListBrand = (props) => {
    const navigation = useNavigation()
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const rs = await getBrand()
            setData(rs)
        } catch (error) {
            console.log(`ListBrand : ${error}`)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ListPhoneByCate', {
                data: item.name
            })}>
                <View style={styles.viewItem}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                </View>
            </TouchableOpacity>

        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Các hãng sản phẩm</Text>
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
        flex: 1
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
