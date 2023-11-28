import { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getRelated } from "../../CallApi/productApi"
const Related = ({ productId }) => {

    const [products, setProducts] = useState([])
    const [title, setTitle] = useState('')

    const getData = async () => {
        try {
            const response = await getRelated(productId)
            setProducts[response]
            if (response.length > 0) {
                setTitle("Sản phẩm liên quan")
            }
        } catch (error) {
            console.log(`Related: ${error}`)
        }
    }


    useEffect(() => {
        getData()
    }, [])

    const renderItem = ({ item, index }) => {
        const handleItem = async () => {
            navigation.navigate('DetailPoducts', { productId: item._id });
        }
        return (
            <View style={styles.body}>
                {item.percent_discount > 0
                    ? (
                        <View style={styles.saler}>
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
                                Giảm {item.percent_discount}%
                            </Text>
                        </View>
                    ) :
                    null
                }


                <TouchableOpacity onPress={handleItem}>
                    <Image style={tailwind`w-35 h-28 self-center mt-4`} source={{ uri: item.image_preview }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={tailwind`mt-4 w-37`}>
                            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.product_name}</Text>
                            <Text style={{ marginTop: 5, marginBottom: 5 }}>Giá: {formatPrice(item.min_price ? item.min_price : 0)}</Text>
                            {item.vote == 0 ? <Text>Chưa có đánh giá</Text> : <StartRating route={item.vote} />}
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        products.length > 0 &&
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            <FlatList
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Related

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8
    },
    header: {
        marginTop: 10, fontWeight: 'bold', fontSize: 15,
        marginBottom: 4
    },
})