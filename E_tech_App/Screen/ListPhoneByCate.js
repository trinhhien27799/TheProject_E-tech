import React, { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from "../CallApi/config";
import tailwind from 'twrnc';

const ListPhone = ({route}) => {
    const navigation = useNavigation();
    
    const nameCategory = route.params;
console.log(nameCategory);

    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/product/get-all`).then((res) => {
            setItems(res.data);
        })
    }, []);
    const renderItem = ({ item }) => {
        items.map
        return (    
            <View style={styles.viewItem}>
                 <TouchableOpacity onPress={() => {navigation.navigate('ChitietSP')}}>
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
            {
                items.map(((item,index) => {
                    if (item.brand_name == nameCategory.data)
                        return (
                            <View key={item._id} style={styles.body}>
                                <TouchableOpacity onPress={() => { navigation.navigate('ProductDetail') }}>
                                    <Image style={styles.img} source={{ uri: item.image_preview }} />
                                    <View style={styles.itemView}>
                                        <Image
                                            source={{ uri: item.image_preview }}
                                            style={tailwind`ml-3 w-20 h-20`}
                                        />
                                        <View style={styles.textView}>
                                            <Text style={styles.textName}>{item.product_name}</Text>
                                            <Text style={styles.textPrice}>Giá: {item.max_price}</Text>
                                            <Text style={styles.textCategory}>Loại: {item.brand_name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        )
                }
                ))
            } 
            <FlatList
            data={items}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item, index) =>item = item.name }
            contentContainerStyle={styles.flatListContent}
        />
        </View>
        
    );
}
export default ListPhone;
const styles = StyleSheet.create({
    textPrice: {
        color: 'red'
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    textView: {
        justifyContent: 'center',
        marginLeft: 10
    },
    itemView: {
        flexDirection: 'row'
    },
});


