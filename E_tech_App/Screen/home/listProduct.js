import React, { useEffect, useState } from "react"
import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native'
import tailwind from "twrnc"
import { getTypeProduct } from '../../CallApi/typeProduct'

const ListProduct = (props) => {
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const getData = async () => {
        try {
            const rs = await getTypeProduct()
            if (rs != null && rs.length > 0) {
                setData(rs)
                setTitle("Các loại sản phẩm")
            }

        } catch (error) {
            console.log(`ListProduct : ${error}`)
        }
    }

    useEffect(() => {
        getData()
    }, [])

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
            <Text style={styles.title}>{title}</Text>
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
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: 'white',
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
