import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { getAllProduct } from "../../CallApi/productApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainHeader = ({ navigation, route }) => {
    const [dataProduct, setDataProduct] = useState([]);
    const scrollView = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [list, setList] = useState('');

    useEffect(() => {
        try {
            const fetchData = async () => {
                const product = await getAllProduct();
                setList(product.length);
                setDataProduct(product);
            }
            fetchData();

            const scrollInterval = setInterval(() => {

                if (currentPage < list) {
                    setCurrentPage(currentPage + 1);
                } else {
                    setCurrentPage(1);
                }
                const offset = (currentPage - 1) * 50;
                if (scrollView.current) {
                    scrollView.current.scrollToOffset({ offset, animated: true });
                }
            }, 3000);

            return () => {
                clearInterval(scrollInterval);
            }
        } catch (e) {
            console.log(e);
        }
    }, [currentPage]);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile', { route: route })}
            >
                <Image style={{ height: 35, width: 35 }} source={require('../../img/appMenu.png')} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.viewSearch}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons style={{ lineHeight: 50 }} name="search" size={25} />
                    <View style={styles.scrollViewContainer}>
                        <FlatList
                            ref={scrollView}
                            data={dataProduct}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={()=>{
                                        const product_name = item.product_name;
                                        const brand_name = item.brand_name;
                                        navigation.navigate('SearchScreen',{product_name,brand_name})
                                    }}
                                >
                                    <View style={styles.viewIndex}>
                                        <Text style={{ color: 'red' }}>{item.product_name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,

        marginTop: 15,
        padding: 8,
        marginLeft: 20
    },
    viewIndex: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 5,
    },
    viewAvatar: {
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5,
        shadowColor: 'gray',
        flexDirection: 'row',
    },
    viewSearch: {
        height: 55,
        width: 270,
        paddingLeft: 20,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'grey',
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContainer: {
        height: 50,
        marginLeft: 10,
    },
});

export default MainHeader;
