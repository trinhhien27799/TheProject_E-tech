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
                const offset = (currentPage - 1) * 45;
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
                <Image style={{ height: 45, width: 45 }} source={require('../../img/appMenu.png')} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.viewSearch}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons style={{ lineHeight: 45 }} name="search" size={25} />
                    <View style={styles.scrollViewContainer}>
                        <FlatList
                            ref={scrollView}
                            data={dataProduct}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.viewIndex}
                                    onTouchStart={() => {
                                        const product_name = item.product_name;
                                        const brand_name = item.brand_name;
                                        navigation.navigate('SearchScreen', { product_name, brand_name })
                                    }}>
                                    <Text style={styles.title}>{item.product_name}</Text>
                                </View>
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
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: 'red'
    },
    viewIndex: {
        flex: 1,
        height: 45,
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
        paddingLeft: 18,
        height: 45,
        flex: 1,
        borderRadius: 50,
        marginStart: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 17,
        textAlignVertical: 'center',
        lineHeight: 45,
        color: 'red'
    },
    scrollViewContainer: {
        flex: 1,
        height: 45,
        marginLeft: 10,
    },
});

export default MainHeader;
