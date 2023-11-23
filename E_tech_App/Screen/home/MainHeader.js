import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useRef, useState } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from "react-native"
import { getAllProduct } from "../../CallApi/productApi"
import { useNavigation } from "@react-navigation/native"


const MainHeader = ({ navigation, route }) => {
    const [dataProduct, setDataProduct] = useState([])
    const scrollView = useRef()
    const [currentPage, setCurrentPage] = useState(0)
    const [list, setList] = useState('')


    const fetchData = async () => {
        try {
            const product = await getAllProduct()
            setList(product.length)
            setDataProduct(product)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const scrollInterval = setInterval(() => {

            if (currentPage < list) {
                setCurrentPage(currentPage + 1)
            } else {
                setCurrentPage(1)
            }
            const offset = (currentPage - 1) * 35
            if (scrollView.current) {
                scrollView.current.scrollToOffset({ offset, animated: true })
            }
        }, 3000)

        return () => {
            clearInterval(scrollInterval)
        }


    }, [currentPage])



    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.viewSearch}
            >


                <Ionicons style={{ lineHeight: 27 }} name="ios-search-outline" size={20} color="red" />

                <FlatList
                    ref={scrollView}
                    data={dataProduct}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                const product_name = item.product_name
                                const brand_name = item.brand_name
                                navigation.navigate('SearchScreen', { product_name, brand_name })
                            }}
                        >

                            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>{item.product_name}</Text>

                        </TouchableOpacity>
                    )}

                />
            </TouchableOpacity>

            <View >
                <View style={styles.icon}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('NotificationsScreen')}
                    >
                        <Ionicons name="ios-notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        height: 35,
        color: 'red',
        fontWeight: '300',
        marginStart: 14,
        lineHeight: 35
    },
    icon: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    viewSearch: {
        height: 35,
        width: "80%",
        paddingHorizontal: 14,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    container: {
        flexGrow: 0,
        paddingVertical: 14,
        backgroundColor: "#5182CC",
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

})

export default MainHeader
