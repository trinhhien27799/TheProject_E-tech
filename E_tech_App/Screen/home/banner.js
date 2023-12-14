import React, { useEffect, useRef, useState } from "react"
import { FlatList, Dimensions, View, StyleSheet, Image, TouchableOpacity, Text } from "react-native"
import { getBanner } from "../../CallApi/banner"
import { useNavigation } from "@react-navigation/core"
import AsyncStorage from "@react-native-async-storage/async-storage"


const card_width = Dimensions.get('window').width
const Banner = () => {
    const scrollViewRef = useRef()
    const [currentPage, setCurrentPage] = useState(0)
    const [dataBanner, setDataBanner] = useState([])
    const navigation = useNavigation()

    const fectData = async () => {
        try {
            const dataOld = await AsyncStorage.getItem('banner')
            if (dataOld) {
                setDataBanner(JSON.parse(dataOld))
            }
            const bannerData = await getBanner()
            if (bannerData.length > 0) {
                setDataBanner(bannerData)
                AsyncStorage.setItem('banner', JSON.stringify(bannerData))
            }
        } catch (error) {
            console.log('Banner', error)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fectData()
        })
        return unsubscribe
    }, [navigation])




    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (currentPage < dataBanner.length - 1) {
                setCurrentPage(currentPage + 1)
            } else {
                setCurrentPage(0)
            }
            const offset = currentPage * card_width
            scrollViewRef.current.scrollToOffset({ offset, animated: true })
        }, 2500) // Tự động cuộn sau 2 giây

        return () => {
            clearInterval(scrollInterval)
        }
    }, [currentPage, dataBanner])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('DetailProducts', { productId: item.productId })}
            >
                <View style={styles.card}>
                    <View>
                        <Image
                            style={styles.image} source={{ uri: item.image }} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={dataBanner}
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ flexGrow: 0 }}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    image: { height: 200, width: card_width, alignItems: 'center', resizeMode: 'cover', }
})

export default Banner
