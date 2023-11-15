import React, { useEffect, useRef, useState } from "react";
import { FlatList, Dimensions, View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { getBanner } from "../../CallApi/productApi";

const card_width = Dimensions.get("window").width;
const card_height = 200;

const Banner = () => {
    const scrollViewRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [dataBanner,setDataBanner]= useState([]);
    useEffect(()=>{
        const fectData = async()=>{
            const bannerData = await getBanner();
                setDataBanner(bannerData);
                const imagePromises = bannerData.map(async (item) => {
                    await Image.prefetch(item.image);
                  });
          
                  await Promise.all(imagePromises);
            }
            fectData();
    },[]);
    useEffect(() => {   
        const scrollInterval = setInterval(() => {
            if (currentPage < dataBanner.length - 1) {
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
    }, [currentPage, dataBanner]);
    

    return (
        <View>
            <FlatList
                data={dataBanner}
                ref={scrollViewRef}
                horizontal
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ margin: 20 }}
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
                    <Image  style={{ borderRadius: 0, height: card_height, width: card_width - 80, resizeMode: 'stretch', alignItems: 'center' }} source={{uri:item.image}} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: card_width,
        height: card_height,
        alignItems: 'center',
        flex: 0,
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
