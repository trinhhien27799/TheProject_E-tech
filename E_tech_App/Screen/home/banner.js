import React, { useEffect, useRef, useState } from "react"
import { FlatList, Dimensions, View, StyleSheet, Image, TouchableOpacity, Text } from "react-native"
import { getBanner } from "../../CallApi/banner"


const card_width = Dimensions.get('window').width
const Banner = () => {
    const scrollViewRef = useRef()
    const [currentPage, setCurrentPage] = useState(0)
    const [dataBanner, setDataBanner] = useState([])

    useEffect(() => {
        const fectData = async () => {
            const bannerData = await getBanner()
            setDataBanner(bannerData)
            const imagePromises = bannerData.map(async (item) => {
                await Image.prefetch(item.image)
            })

            await Promise.all(imagePromises)
        }
        fectData()
    }, [])
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

const renderItem = ({ item }) => {
    return (
        <TouchableOpacity>
            <View style={styles.card}>
                <View>
                    <Image
                        style={styles.image} source={{ uri: item.image }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: { height: 200, width: card_width, alignItems: 'center', resizeMode: 'cover', }
})

export default Banner
