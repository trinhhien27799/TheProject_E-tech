import React, { useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import colors from "./colors";
import { useNavigation } from "@react-navigation/native";

const ListItem = (props) => {
    const navigation = useNavigation();
    const { item } = props;
    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
            <TouchableOpacity onPress={() => {navigation.navigate('ProductDetail')}}>
                <View>
                    <View style={styles.view}>
                        <Image
                            style={styles.image}
                            source={item.url} />

                        <View style={{
                            flex: 1,
                            marginRight: 15,
                            padding: 5,
                        }}>
                            <Text style={{
                                color: 'black',
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>{item.name}</Text>

                            <View style={{
                                height: 1,
                                backgroundColor: colors.grey,
                                marginTop: 5
                            }}></View>

                            <Text style={{ fontSize: 12, color: colors.grey }}>Giá: {item.price}</Text>
                            <Text style={{ fontSize: 12, color: colors.grey }}>Hãng: {item.company}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    color: colors.grey,
                                    fontSize: 12,
                                }}>Trạng thái: </Text>
                                <Text style={{
                                    color: item.status ? colors.conHang : colors.hetHang,
                                    fontSize: 12,
                                }}>{item.status ? <Text>Còn hàng</Text> : <Text>Hết hàng</Text>} </Text>
                            </View>
                        </View>

                        <View style={styles.viewButton}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{ color: 'white', lineHeight: 29.7, fontWeight: "bold", fontSize: 12 }}>Mua ngay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{ color: 'white', textAlign: 'center', fontWeight: "bold", fontSize: 12 }}>Thêm vào giỏ hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default ListItem;
const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
        borderRadius: 8,
        marginRight: 15,
        marginTop: 8
    },
    view: {
        height: 150,
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: 'row',
        marginVertical: 6,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        shadowRadius: 10,
    },
    viewButton: {
        // backgroundColor:'red',
        flex: 0.5,
        margin: 10,
        alignItems: 'center',
    },

    // Fix height & width
    button: {
        backgroundColor: colors.hetHang,
        borderRadius: 10,
        padding: 5,
        width: 90,
        marginBottom: 5,
        marginRight: 10,
        alignItems: 'center',
        height: 45
    }
});