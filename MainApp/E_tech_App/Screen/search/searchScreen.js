import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, FlatList, Text } from "react-native";
const SearchScreen = ({ navigation }) => {

    const textInputRef = useRef(null);
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState('');
    const [isShowMore, setIsShowMore] = useState(false);


    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }

    }, []);
    const handleSearch = () => {
        if (search) {
            setHistory(prevHistory => [...prevHistory, search]);
            setSearch('');
        }

    };
    const deleteHistory = ()=>{
        setHistory([]);

    }
    const deleteHistoryItem = (itemToDelete) => {
        const updatedHistory = history.filter(item => item !== itemToDelete);
        setHistory(updatedHistory);
    };

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
                        placeholder="Tìm kiếm sản phẩm bạn cần"
                        ref={textInputRef}
                        style={styles.textInput}
                        onChangeText={(text) => setSearch(text)}
                        value={search}

                    />
                    <TouchableOpacity
                        onPress={handleSearch}
                    >
                        <Ionicons size={20} name="search" style={{ color: 'gray' }} />
                    </TouchableOpacity>
                </View>

            </View>
            <View>
                <FlatList
                    data={
                        isShowMore ?
                            history.slice(-10).reverse() :
                            history.slice(-5).reverse()
                    }

                    keyExtractor={(item, index) => index.toString()}
                    horizontal={false}
                    renderItem={({ item }) => (
                        <ItemFlatlist item={item} onDeleteItem={deleteHistoryItem}/>
                    )}
                    ItemSeparatorComponent={Line}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    scrollEnabled={true}

                />
            </View>
            <Line />
            <ShowHistory history={history} isShowMore={isShowMore} setIsShowMore={setIsShowMore} deleteHistory={deleteHistory}/>
        </View>
    );
};
const ItemFlatlist = ({ item,onDeleteItem }) => {
    return (
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity
        >
            <View style={styles.textFlatList}>
                <Text>{item}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.textFlatList}
        onPress={()=>onDeleteItem(item)}
        >
            <Image style={{height:20,width:20}} source={require("../../img/cancle.png")}/>
        </TouchableOpacity>
        </View>
    );
}
const ShowHistory = ({ history, isShowMore, setIsShowMore,deleteHistory }) => {
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
                                            onPress={onPress={deleteHistory}}
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