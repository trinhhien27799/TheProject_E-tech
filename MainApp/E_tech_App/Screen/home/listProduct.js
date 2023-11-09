import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View,TouchableOpacity  } from "react-native";
import LabelItems from "../../Model/itemHangPhone";
import { useNavigation } from '@react-navigation/native';

const ListProduct = (props) => {
     const navigation = useNavigation();

    const renderItem = ({ item }) => {
        return (
            <View style={styles.viewItem}>
                 <TouchableOpacity  onPress={() =>navigation.navigate('ListPhoneByCate', {
              data: item.name
            })}>
                <Image style={styles.image} source={item.img} />
                <Text style={styles.textItem}>
                    {item.name}
                </Text>
                </TouchableOpacity>
            </View>
           
        );
    };
    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Các loại sản phẩm</Text>
            <ScrollView horizontal >
                <FlatList
                    data={LabelItems}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item) =>item = item.name }
                    contentContainerStyle={styles.flatListContent}
                />
            </ScrollView>
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
