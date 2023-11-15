import React, { useEffect, useRef, useState } from "react";
import { FlatList, Dimensions, View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { getBanner } from "../../CallApi/productApi";
import { ScrollView } from "react-native-gesture-handler";

const card_width = Dimensions.get("window").width;
const card_height = 190;
export const SLIDER_WIDTH = Dimensions.get('window').width - 32
const Banner = () => {
    const scrollViewRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [dataBanner, setDataBanner] = useState([]);
    useEffect(() => {
        const fectData = async () => {
            const bannerData = await getBanner();
            setDataBanner(bannerData);
            const imagePromises = bannerData.map(async (item) => {
                await Image.prefetch(item.image);
            });

            await Promise.all(imagePromises);
        }
        fectData();
    }, []);
    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (currentPage < dataBanner.length - 1) {
                setCurrentPage(currentPage + 1);
            } else {
                setCurrentPage(0);
            }
            const offset = currentPage * card_width;
             scrollViewRef.current.scrollToOffset({ offset, animated: true });
        }, 3000); // Tự động cuộn sau 2 giây

        return () => {
            clearInterval(scrollInterval);
        };
    }, [currentPage, dataBanner]);


    return (
        <View style={styles.container}>
            <FlatList
                data={dataBanner}
                ref={scrollViewRef}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={styles.flatlist}
            />
           
        </View>
    );
};

const renderItem = ({ item }) => {
    return (
        <TouchableOpacity>
            <View >
                <View>
                    <Image style={styles.image} source={{ uri: item.image }} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    flatlist: {
        marginTop: -60,
        width: SLIDER_WIDTH
    },
    image: {
        borderRadius: 12,
        height: card_height,
        width: SLIDER_WIDTH,
        resizeMode: 'stretch',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    }
});

export default Banner;
