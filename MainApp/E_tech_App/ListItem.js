import React, { useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import colors from "./colors";

const ListItem = (props) => {
    const {item} = props;
    return (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <View style={styles.view}>
                    <Image
                        style={styles.image}
                        source={item.url} />
                    <View style={{
                        flex: 1,
                        marginRight: 10,
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 30,
                            fontWeight: 'bold'
                        }}>Iphone 15</Text>
                        <View style={{
                            height: 1,
                            backgroundColor: colors.grey,
                            marginTop: 5
                        }}></View>
                        <Text style={{ fontSize: 15, color: colors.grey }}>Giá: {item.price}</Text>
                        <Text style={{ fontSize: 15, color: colors.grey }}>Hãng: {item.company}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: colors.grey,
                                fontSize: 15,
                            }}>Trạng thái: </Text>
                            <Text style={{
                                color: item.status ? colors.conHang : colors.hetHang,
                                fontSize: 15,
                            }}>{item.status ? <Text>Còn hàng</Text> : <Text>Hết hàng</Text>} </Text>

                        </View>
                    </View>
                    <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{ color: 'white', lineHeight: 40 }}>Mua ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        flexDirection: 'row'
    },
    viewButton: {
        // backgroundColor:'red',
        flex: 0.5,
        margin: 10,
        alignItems: 'center',

    },
    button: {
        backgroundColor: colors.hetHang,
        borderRadius: 10,
        padding: 5,
        width: 100,
        marginBottom: 5,
        marginRight: 10,
        alignItems: 'center',
        height: 50
    }
});