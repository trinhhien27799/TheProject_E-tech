import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { addCart } from "../CallApi/cartApi";

const ViewModal = ({ route, data }) => {
    const [quantity, setQuantity] = useState(1);
    const [dataCart, setDataCart] = useState({
        "variations_id": data._id,
        "quantity": quantity,
    })
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const navigation = useNavigation();
    const handleAdd = async () => {
        navigation.goBack();
        await addCart({ dataCart: dataCart });
    }
    return (
        <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton}>
                    <Ionicons name="close" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: data.image }} style={styles.image} />
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{numberWithCommas(route.dataItem.max_price)}</Text>
                <Text >Kho: {route.dataItem.total_quantity}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.title}>Màu sắc</Text>
                <View style={styles.viewItem}>
                    <Text>{data.color}</Text>
                </View>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.title}>Dung lượng</Text>
                <View style={styles.viewItem}>
                    <Text>{data.ram}/{data.rom}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: 100, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1);
                                setDataCart(prevData => ({ ...prevData, quantity: quantity - 1 }));

                            }
                        }}
                    >
                        <Image source={require('../img/minus.png')} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {quantity}
                    </Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => {
                            setQuantity(quantity + 1);
                            setDataCart(prevData => ({ ...prevData, quantity: quantity + 1 }));

                        }}
                    >
                        <Image source={require('../img/plus.png')} style={{ height: 30, width: 30 }} />

                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={{ backgroundColor: '#1E90FF', margin: 10, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                onPress={handleAdd}
            >
                <Text>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row-reverse',
    },
    closeButton: {
        right: 'auto',
    },
    image: {
        borderWidth: 2,
        height: 100,
        width: 100,
        resizeMode: 'contain',
        borderRadius: 10,
        alignSelf: 'center'
    },
    priceContainer: {
        alignItems: 'center',
    },
    price: {
        color: "red",
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoItem: {
        marginBottom: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    viewItem: {
        height: 40,
        width: Dimensions.get("window").width - 100,
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#1E90FF',
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});

export default ViewModal;