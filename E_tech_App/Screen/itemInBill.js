import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CommentButton from "../Component/CommentButton";
import { formatPrice } from "../utils/format";
import { checkComment } from "../CallApi/commentAPI";

const ItemInBill = ({ item }) => {
    const [caches, setGetCacheArray] = useState([])
    const getCache = async (variationId) => {
        try {
            const data = { variationId: variationId }
            const response = await checkComment(data);
            setGetCacheArray(response);
        } catch (error) {
            console.log('BillDetailScreen: ', error)
        }
    }

    useEffect(() => {
        if (item.status == 2) getCache(item.variation_id)
    }, [])

    return (
        // Cart Item
        <View style={styles.itemContainer}>
            <View style={styles.cartItem}>

                <View style={styles.imgItemView}>
                    <Image
                        style={styles.imgItem}
                        source={{ uri: item.image }}
                    />
                </View>

                <View style={styles.nameItemView}>
                    <View >
                        <Text style={styles.nameItem}>{item.product_name}</Text>
                        <Text style={styles.textQuantity}>Số lượng: {item.quantity}</Text>
                    </View>

                </View>
            </View>
            <View style={styles.textTotal}>
                <Text style={styles.textTotal}>Tổng cộng: {formatPrice(item.price * item.quantity)}</Text>
            </View>

            {caches.length > 0 && <CommentButton item={item} />}
        </View>
    )
}

export default ItemInBill

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'column',
        borderBottomWidth: 1.3,
        paddingVertical: 10,
        borderBottomColor: '#D5D5D5',
        justifyContent: 'center'

    },
    cartItem: {
        width: '100%',
        flexGrow: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20
    },

    imgItem: {
        width: 80,
        height: 80,
        backgroundColor: '#D5D5D5',
        justifyContent: 'center',
        borderRadius: 5,
        resizeMode: 'center'
    },

    nameItemView: {
        flex: 1, marginStart: 15

    },
    categoryItem: {
        color: 'black',
        fontSize: 13,
        marginTop: 10
    },
    nameItem: {
        fontSize: 15,
        fontWeight: 'bold',

    },
    textQuantity: {
        fontSize: 13.5,
    },
    textTotal: {
        textAlign: 'right',
        fontSize: 13.5,
        fontWeight: 'bold',
    },
})