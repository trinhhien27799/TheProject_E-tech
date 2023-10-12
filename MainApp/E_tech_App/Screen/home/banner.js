import React, { useEffect, useRef, useState } from "react";
import { FlatList, Dimensions, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const card_width = Dimensions.get("window").width;
const card_height = 200;

const Banner = ({ list }) => {
    const scrollViewRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (currentPage < list.length - 1) {
                setCurrentPage(currentPage + 1);
            } else {
                setCurrentPage(0);
            }
            const offset = currentPage * card_width;
            scrollViewRef.current.scrollToOffset({ offset, animated: true });
        }, 2000); // Tự động cuộn sau 2 giây

        return () => {
            clearInterval(scrollInterval);
        };
    }, [currentPage, list]);

    return (
        <View>
            <FlatList
                data={list}
                ref={scrollViewRef}
                horizontal
                contentContainerStyle={{margin:20}}
                pagingEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ height: 220 }}
            />
        </View>
    );
};

const renderItem = ({ item }) => {
    return (
            <TouchableOpacity>
                <View style={styles.card}>
                    <View>
                        <Image style={{ margin:30, borderRadius: 10, height: card_height, width: card_width - 60, resizeMode: 'stretch' }} source={item.url} />

                    </View>
                </View>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: card_width,
        height: card_height,
    },
    imageBox: {
        width: card_width,
        height: card_height,
        borderRadius: 10,
        overflow: 'hidden',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
});

export default Banner;
