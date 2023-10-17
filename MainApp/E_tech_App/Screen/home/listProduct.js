import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
// import items from "../../Model/items";
import items from '../../Model/itemHangPhone';

const ListProduct = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Các loại sản phẩm</Text>
            <ScrollView horizontal >
                <FlatList
                    data={items}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContent}
                />
            </ScrollView>
        </View>
    );
};

const renderItem = ({ item }) => {
    return (
        <View style={styles.viewItem}>
            <Image style={styles.image} source={item.img} />
            <Text style={styles.textItem}>
                {item.name}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    scrollView: {
        flexDirection: 'column',
        margin: 20
    },
    flatListContent: {
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 90,
        borderRadius: 10,
        resizeMode: 'stretch',
        margin: 10,

    },
    viewItem: {
        flex: 1,
        backgroundColor: 'white',
        margin: 20,
        width: 150,
        height: 170,
        borderRadius: 20,
        shadowColor: 'black',
        alignItems: 'center',
        shadowRadius: 10
    },
    textItem: {
        fontSize: 20,
        fontWeight: 'bold',
    }

});

export default ListProduct;
