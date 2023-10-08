import React, { useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";

const ListHangPhone = (props) => {
    const { item } = props;
    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>

            <View>
                <Image
                    style={styles.image}
                    source={item.img} />
            </View>
            <Text style={{ fontSize: 18, color: 'black' }}>{item.name}</Text>
        </View>
    );
}
export default ListHangPhone;
const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
        borderRadius: 8,
        marginRight: 8,
        marginTop: 8
    }
});  