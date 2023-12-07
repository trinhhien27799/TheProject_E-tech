import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LoadingWidget from '../../Component/loading'
import { deleteListAddress, getAddress } from '../../CallApi/AddressAPI'
import AddressItem from './AddressItem'
import { Entypo } from '@expo/vector-icons'



const AddressScreen = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [check, setCheck] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [listCheck, setListCheck] = useState([])
    const [loadingDelete, setLoadingDelete] = useState(false)
    const getData = async () => {
        try {
            const response = await getAddress()
            setData(response)
        } catch (error) {
            console.log('Address Screen: ', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe
    }, [navigation])

    const RenderItem = ({ item, index }) => {
        return <AddressItem item={item} index={index} check={check} listCheck={listCheck} setListCheck={setListCheck} />
    }
    const handleOutsidePress = () => {
        setShowPopup(false)
    }

    const mutipleCheck = () => {
        setShowPopup(false)
        setCheck(true)
    }


    const addNew = () => {
        setShowPopup(false)
        navigation.navigate('NewAddress', { address: null })
    }

    const cancelCheck = () => {
        setCheck(false)
        setListCheck([])
    }


    const handleDelete = () => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc muốn xóa không?',
            [{ text: 'Hủy', style: 'cancel', },
            {
                text: 'Xóa',
                onPress: () => {
                    deleteItems()
                },
            },],
            { cancelable: false }
        )
    }

    const deleteItems = async () => {
        try {
            setLoadingDelete(true)
            const response = await deleteListAddress(listCheck)
            if (response.code == 200) {
                alert("Xóa thành công")
                setData(data.filter((element) => !listCheck.includes(element._id)))
                setListCheck([])
                setCheck(false)
            } else {
                alert("Xóa thất bại")
            }
        } catch (error) {
            console.log('Address Screen: ', error)
            alert("Xóa thất bại")
        } finally {
            setLoadingDelete(false)
        }
    }


    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { navigation.goBack() }}>
                        <Image source={require('../../img/arrow-left.png')}
                            style={{ width: 16, height: 16, marginEnd: 20 }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Sổ địa chỉ</Text>
                    <View style={{ flex: 1 }} />
                    {data.length > 0 &&
                        (loadingDelete ? <LoadingWidget /> :
                            (check ?
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={cancelCheck}>
                                        <Text style={{ color: 'grey', fontSize: 16 }}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleDelete}
                                        disabled={listCheck.length == 0}
                                        style={{ marginStart: 20 }}>
                                        <Text style={{ color: listCheck.length == 0 ? 'grey' : 'red', fontSize: 16 }}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowPopup(!showPopup)
                                    }}
                                >
                                    <Entypo
                                        name="dots-three-vertical"
                                        size={20}
                                        color="black"
                                    />

                                </TouchableOpacity>))
                    }
                </View>
                {loading ? <LoadingWidget /> :
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        renderItem={RenderItem}
                    />}

                {showPopup &&

                    <View style={styles.viewPopup}>
                        <TouchableOpacity
                            onPress={mutipleCheck}
                            style={styles.itemPopup}>
                            <Image
                                style={styles.iconPopup}
                                source={require('../../assets/double-check.png')} />
                            <Text style={styles.textPopup}>Chọn nhiều</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity
                            onPress={addNew}
                            style={styles.itemPopup}>
                            <Image
                                style={styles.iconPopup}
                                source={require('../../assets/add.png')} />
                            <Text style={styles.textPopup}>Thêm địa chỉ</Text>
                        </TouchableOpacity>
                    </View>

                }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'whitesmoke',
        flex: 1
    },
    header: {
        width: Dimensions.get('window').width,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        alignItems: 'center',
        paddingVertical: 15,
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: 'white'
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewPopup: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'white',
        elevation: 10

    },
    textPopup: {
        marginStart: 10
    },
    line: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'grey'
    },
    itemPopup: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    iconPopup: {
        width: 20, height: 20,
        resizeMode: 'cover'
    }
})