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

            <View style={styles.headerContainer}>
                <View style={{ paddingLeft: 16, paddingTop: 40, flexDirection: 'row', justifyContent: 'space-between',marginTop:5 }}>
                    <TouchableOpacity
                        style={styles.viewSearch}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons style={{ lineHeight: 50 }} name="ios-search-outline" size={24} color="black" />
                            <View style={styles.scrollViewContainer}>
                                <FlatList
                                    ref={scrollView}
                                    data={dataProduct}
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                const product_name = item.product_name;
                                                const brand_name = item.brand_name;
                                                navigation.navigate('SearchScreen', { product_name, brand_name })
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

                    <View style={{ paddingRight: 16 }}>
                        <View style={styles.iconNotifyContainer}>
                            <TouchableOpacity>
                                <Ionicons name="ios-notifications-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 60, }}>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconNotifyContainer: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
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
        height: 35,
        width: 290,
        paddingLeft: 10,
        borderRadius: 50,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContainer: {
        height: 50,
        marginLeft: 10,
    },
    welComeContainer: {
        flexDirection: 'row',
        width: 146,
        height: 36,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: 10,
        borderRadius: 20,
        paddingRight: 10,
    },

    headerContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#5182CC",
    },

    container: {
        width: "100%",
        height: 160,
        backgroundColor: "white",
    },

});

export default MainHeader;
