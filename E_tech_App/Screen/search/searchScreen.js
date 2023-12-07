import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllProduct } from "../../CallApi/productApi";
import { useNavigation } from "@react-navigation/native";
const SearchScreen = ({ route }) => {
    const navigation = useNavigation();
    const product_name = route.params.product_name;
    const textInputRef = useRef(null);
    const [history, setHistory] = useState([]);
    const [isShowMore, setIsShowMore] = useState(false);
    const [dataProduct, setDataProduct] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const brand_name = route.params.brand_name;
    useEffect(() => {
        try {
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
            const fetchData = async () => {
                const product = await getAllProduct();
                setDataProduct(product);
            }
            fetchData();
            loadSearchHistory();
        } catch (error) {
            console.log(error);
        }
    }, []);

    
    const handleSearch = async ({item}) => {
        if (!textSearch) {
            const newSearchItem = { product_name, brand_name };
            await AsyncStorage.setItem('searchHistory', JSON.stringify([newSearchItem, ...history]));
            setHistory(prevHistory => [...prevHistory, newSearchItem]);
            navigation.navigate('ViewItem',{newSearchItem})
        }else{
            const newSearchItem = {product_name: item.product_name, brand_name: item.brand_name} 
            await AsyncStorage.setItem('searchHistory', JSON.stringify([newSearchItem, ...history]));
            setHistory(prevHistory => [...prevHistory, newSearchItem]);
            navigation.navigate('ViewItem',{newSearchItem})
        }
    };
    const deleteHistory = async () => {
        await AsyncStorage.removeItem('searchHistory');
        setHistory([]);
    }
    const loadSearchHistory = async () => {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
            setHistory(JSON.parse(history));
        }
    };
    const handleItem = ({item,data})=>{
        setTextSearch('');
        handleSearch({item:data});
    }
    return (
        <View>
            <View style={styles.viewHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image style={{ height: 30, width: 30 }} source={require('../../img/previous.png')} />
                </TouchableOpacity>
                <View style={styles.viewSearch}>
                    <TextInput
                        placeholder={product_name}
                        ref={textInputRef}
                        style={styles.textInput}
                        onChangeText={(text) => {
                            setTextSearch(text)
                        }}
                        value={textSearch}
                    />
                    <TouchableOpacity
                        onPress={handleSearch}
                    >
                        <Ionicons size={20} name="search" style={{ color: 'gray' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {
                    !textSearch ? (<FlatList
                        data={
                            isShowMore ?
                                history.slice(-10).reverse() :
                                history.slice(-5).reverse()
                        }
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate('ViewItem',{newSearchItem: item})
                                }}
                            >
                                <ItemFlatlist item={item} />
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={Line}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        scrollEnabled={true}

                    />) : (
                        <FlatList
                            data={dataProduct}
                            horizontal={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                item.product_name.toLowerCase().includes(textSearch.toLowerCase()) ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleItem({item:item.product_name,data:item});
                                            }}
                                        >
                                            <ItemFlatlist item={item} />
                                        </TouchableOpacity>
                                    </>
                                ) : null
                            )}
                            ItemSeparatorComponent={Line}
                        />
                    )
                }
            </View>
            <Line />
            {
                !textSearch ? (
                    <ShowHistory history={history} isShowMore={isShowMore} setIsShowMore={setIsShowMore} deleteHistory={deleteHistory} />
                ) : null
            }
        </View>
    );
};
const ItemFlatlist = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.textFlatList}>
                <Text>{item.product_name}</Text>
            </View>
        </View>
    );
}
const ShowHistory = ({ history, isShowMore, setIsShowMore, deleteHistory }) => {
    return (
        <View>
            {history.length == 0 ? null :
                <View>
                    {
                        history.length <= 5 ?
                            <TouchableOpacity
                                style={{ alignItems: 'center', margin: 10 }}
                                onPress={deleteHistory}
                            >
                                <Text style={{ color: 'gray' }}>Xóa lịch sử</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={{ alignItems: 'center', margin: 10 }}
                                onPress={() => setIsShowMore(true)}
                            >
                                {
                                    isShowMore ?
                                        <TouchableOpacity
                                            onPress={deleteHistory}
                                        >
                                            <Text style={{ color: 'gray' }}>Xóa lịch sử</Text>
                                        </TouchableOpacity> :
                                        <Text style={{ color: 'gray' }}>Hiển thị nhiều hơn</Text>
                                }
                            </TouchableOpacity>
                    }
                </View>
            }
        </View>
    );
}
const Line = () => (
    <View
        style={{
            height: 1,
            width: "100%",
            backgroundColor: "gray",
        }}
    />
);
export default SearchScreen;
const styles = StyleSheet.create({


    viewHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingTop: 40,
        backgroundColor: '#1E90FF'
    },
    viewSearch: {
        height: 50,
        width: Dimensions.get('window').width - 100,
        marginLeft: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: 'white'
    },
    textInput: {
        height: 40,
        width: Dimensions.get('window').width - 200,
        color: 'grey'
    },
    textFlatList: {
        margin: 15,
    }
});