import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, FlatList, Text, Alert, SectionList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from 'lottie-react-native'
import tailwind from "twrnc";
import { formatPrice } from "../../utils/format";
import StartRating from "../../Component/startRating";
import { kiemTraTuGanNhau, tinhDoTuongDong } from "../../utils/searchText";
const SearchScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [itemFind, setItem] = useState([])
    const [querry, setQuerry] = useState('')
    const [recommend, setRecommend] = useState([])
    const [recent, setRecent] = useState([])
    const [history, setHistory] = useState([])
    const [showHistory, setShowHistory] = useState(false)
    const [product, setProduct] = useState([])

    const getData = async () => {
        try {
            const dataOld = await AsyncStorage.getItem('product')
            if (dataOld) {
                setProduct(JSON.parse(dataOld))
            }
            const response = await getAllProduct()
            if (response != null && response.length > 0) {
                setProduct(response)
                AsyncStorage.setItem('product', JSON.stringify(response))
            }
        } catch (error) {
            console.log(`bestSeller: ${error}`)
        }
    }

    useEffect(() => {
        if (route.params?.item != null) {
            setItem([route.params.item])
            setQuerry(String(route.params.item.product_name).trim())
            if (route.params?.product) {
                setProduct(route.params.product)
                setRecommend(route.params.product.filter(item => item.product_type_id == route.params.item.product_type_id))
            }
        }
        if (!route.params?.product) {
            getData()
        }
    }, [])

    const saveHistory = async () => {
        try {
            if (querry.toString().trim().length == 0) return
            const index = history.lastIndexOf(querry.toString().trim())
            if (index == history.length) return
            var update = history
            if (index > -1) update.splice(index, 1)
            update.unshift(String(querry).trim())
            setHistory(update)
            const oldHistory = await AsyncStorage.getItem('history')
            var newHistory = []
            if (oldHistory) {
                newHistory = JSON.parse(oldHistory).filter(item => item !== querry)
            }
            newHistory.unshift(querry)
            const save = (newHistory.length < 6) ? newHistory : newHistory.slice(0, 5)
            AsyncStorage.setItem('history', JSON.stringify(save))
        } catch (error) {
            console.log('saveHistory:', error)
        }
    }

    const getHistory = async () => {
        try {
            const data = await AsyncStorage.getItem('history')
            if (data) {
                setHistory(JSON.parse(data))
            }
        } catch (error) {
            console.log('getHistory:', error)
        }
    }

    const getArrayRecent = async () => {
        try {
            // AsyncStorage.removeItem('product_recent')
            const arraytRecent = await AsyncStorage.getItem('product_recent')
            if (arraytRecent) {
                setRecent(JSON.parse(arraytRecent))
            }
        } catch (error) {
            console.log('Array recent:', error)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getArrayRecent()
            getHistory()
        })
        return unsubscribe
    }, [navigation])

    const filterProduct = () => {
        if (querry.trim().length == 0) {
            setItem([])
            setRecommend(product)
        } else {
            const newArraySearch = product.filter((item) =>
                tinhDoTuongDong(querry, item.product_name)
            )
            setItem(newArraySearch)
            if (newArraySearch.length == 0) {
                const newArrayRecommendByName = product.filter((item) =>
                    kiemTraTuGanNhau(querry, item.product_name) || tinhDoTuongDong(querry, item.product_name)
                )
                setRecommend(newArrayRecommendByName)
                if (newArrayRecommendByName.length == 0) {
                    const newArrayRecommendByBrand = product.filter((item) =>
                        kiemTraTuGanNhau(querry, item.product_type) || tinhDoTuongDong(querry, item.product_type)
                    )
                    setRecommend(newArrayRecommendByBrand)
                    if (newArrayRecommendByBrand.length == 0) {
                        setRecommend(product)
                    }
                }

            }
        }

    }

    useEffect(() => {
        filterProduct()
    }, [querry])

    const handleTextQuerry = (text) => {
        const txt = text.toString().replaceAll('  ', ' ')
        setQuerry(txt)
    }

    const renderItem = ({ item, index }) => {
        const handleItem = async () => {
            navigation.navigate('DetailProducts', { productId: item._id });
        }
        return (
            <View style={styles.body}>
                {item.percent_discount > 0
                    ? (
                        <View style={styles.saler}>
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
                                Giảm {item.percent_discount}%
                            </Text>
                        </View>
                    ) :
                    null
                }


                <TouchableOpacity onPress={handleItem}>
                    {item.image_preview && <Image style={{ resizeMode: 'center', width: 150, height: 150, alignSelf: 'center' }} source={{ uri: item.image_preview }} />}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={tailwind`mt-4 w-37`}>
                            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.product_name}</Text>
                            <Text style={{ marginTop: 5, marginBottom: 5 }}>Giá: {formatPrice(item.min_price ? item.min_price * (item.percent_discount != 0 ? (1 - item.percent_discount * 0.01) : 1) : 0)}</Text>
                            {item.vote == 0 ? <Text>Chưa có đánh giá</Text> : <StartRating route={item.vote} size={15} />}
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const data = [
        { type: 0 },
        { type: 1 },
        { type: 2 },
        { type: 3 }
    ]
    const sections = [{ data, key: 'section' }]


    const component = ({ item }) => {
        switch (item.type) {
            case 0:
                return (
                    <View style={styles.appBar}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../img/arrow-left.png')} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.seachView}
                            placeholder="Nhập thông tin sản phẩm muốn tìm"
                            value={querry}
                            onChangeText={(text) => {
                                handleTextQuerry(text)
                            }}
                            onEndEditing={() => {
                                filterProduct()
                                saveHistory()
                            }}
                            onPressOut={() => {
                                setShowHistory(true)
                            }}
                            onSubmitEditing={() => {
                                setShowHistory(false)
                            }} />
                    </View>
                )
            case 1:
                return (
                    showHistory && history.length > 0 &&
                    <View style={styles.viewHistory}>
                        <Text style={styles.textTitle}>Lịch sử tìm kiếm</Text>
                        <FlatList
                            data={history}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setQuerry(item.toString().trim())
                                        setShowHistory(false)
                                    }}>
                                    <Text style={styles.itemHistory}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={{ flexGrow: 0 }}
                        />
                    </View>

                )
            case 2:
                return (
                    itemFind.length > 0 ?
                        <>
                            <Text style={styles.textTitle}>Tìm thấy {itemFind.length} sản phẩm phù hợp</Text>
                            <FlatList
                                horizontal
                                data={itemFind}
                                keyExtractor={(item, index) => item._id}
                                renderItem={renderItem}
                                style={{ flexGrow: 0 }}
                            />
                        </>
                        :
                        <View style={{ alignSelf: 'center', alignItems: 'center', width: '100%' }}>
                            <LottieView
                                autoPlay
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: 'white',
                                    marginTop: 5
                                }}
                                source={require('../../assets/not-found.json')}
                            />
                            <Text
                                style={{ marginTop: 30, fontSize: 15 }}>Hãy thử tìm một sản phẩm khác nhé!</Text>
                            {
                                recommend.length > 0 &&
                                <>
                                    <Text style={styles.textTitle}>Sản phẩm đề xuất</Text>
                                    <FlatList
                                        horizontal
                                        data={recommend}
                                        keyExtractor={(item, index) => item._id}
                                        renderItem={renderItem}
                                        style={{ flexGrow: 0 }}
                                    />
                                </>
                            }
                        </View>
                )
            case 3:
                return (
                    <>
                        <Text style={styles.textTitle}>Đã xem gần đây</Text>
                        <FlatList
                            horizontal
                            data={recent}
                            keyExtractor={(item, index) => item._id}
                            renderItem={renderItem}
                            style={{ flexGrow: 0 }}
                        />
                    </>
                )
            default:
                return null
        }
    }



    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => index.toString()}
                renderItem={component}
            />

        </View>


    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    appBar: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        elevation: 10,
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,


    },
    seachView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 6,
        marginHorizontal: 15,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 8
    },
    textTitle: {
        fontWeight: '500',
        fontSize: 18,
        alignSelf: 'flex-start',
        margin: 15,
    },
    body: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width / 2 - 16,
        borderRadius: 10,
        shadowColor: 'grey',
        shadowRadius: 7,
        alignItems: 'center',
        shadowOpacity: 0.8,
        margin: 6,
        padding: 15,
        elevation: 10
    },
    saler: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 75,
        height: 35,
        backgroundColor: 'red',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 10,
        zIndex: 2,
    },
    img: {
        height: 100,
        width: 140,
        zIndex: 1,
        marginTop: 25,
    },
    viewHistory: {
        backgroundColor: 'white',
    },
    itemHistory: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 0.4,
        borderBottomColor: 'grey'
    }
})