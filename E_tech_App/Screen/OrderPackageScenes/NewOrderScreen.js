import React, { useEffect, useRef, useState } from 'react'
import { Text, FlatList, TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native'
import tailwind from 'twrnc'
import { useNavigation, useRoute } from '@react-navigation/native'
import CheckPayScreenFix from './CheckPayScreenFix'
import { Image } from 'react-native'
import { getBillByStatus } from '../../CallApi/billApi'
import LoadingWidget from '../../Component/loading'
import AsyncStorage from '@react-native-async-storage/async-storage'



const NewOrderScreen = () => {
    const route = useRoute()
    const [value, setValue] = useState(route.params.getValueOrder ?? 'get-all')
    const [oldValue, setOldValue] = useState(route.params.getValueOrder)
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const flatListRef = useRef(null)

    const buttonValueList = [
        {
            buttonName: 'Tất cả',
            valueCheck: 'get-all'
        },
        {
            buttonName: 'Chờ xác nhận',
            valueCheck: '0'
        },
        {
            buttonName: 'Đang giao hàng',
            valueCheck: '1'
        },
        {
            buttonName: 'Đã giao hàng',
            valueCheck: '2'
        },
        {
            buttonName: 'Đã hủy',
            valueCheck: '-1'
        },
    ]

    const getData = async (status) => {
        try {
            setLoading(true)
            const response = await getBillByStatus(status)
            if (response) {
                setData(response)
                if (status == 0) AsyncStorage.setItem('bill0', String(response.length))
                if (status == 1) AsyncStorage.setItem('bill1', String(response.length))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const scrollToIndex = buttonValueList.findIndex(item => item.valueCheck === value)
        if (scrollToIndex !== -1) {
            if (scrollToIndex == buttonValueList.length - 1) {
                flatListRef.current?.scrollToEnd({ animated: true })
            } else {
                const offset = (value >= 1) ? (oldValue <= value) ? scrollToIndex * 100 : scrollToIndex * 100 * -1 : 0
                flatListRef.current?.scrollToOffset({ offset: offset, animated: true })
            }
        }
        getData(value)
        setOldValue(value)
    }, [value])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData(value)
        })

        return unsubscribe
    }, [navigation])



    const ButtonCard = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    height: 40, paddingHorizontal: 15, paddingVertical: 7,
                    backgroundColor: '#eeeeee', borderRadius: 8, marginHorizontal: 10, borderColor: '#209ce2',
                    borderWidth: item.valueCheck == value ? 2 : 0,
                    justifyContent: 'center'
                }}
                onPress={() => { setValue(item.valueCheck) }}
            >
                <Text>{item.buttonName}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={tailwind`bg-white mb-3`}>

                <View style={{ paddingVertical: 10 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        ref={flatListRef}
                        data={buttonValueList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ButtonCard}
                        horizontal
                        style={{ flexGrow: 0, width: Dimensions.get('window').width }}
                    />
                </View>
            </View>

            {loading ? <LoadingWidget /> :
                (data.length == 0 ?
                    <View style={tailwind`h-200 justify-center`}>
                        <Image
                            source={require('../../img/package_862074.png')}
                            style={tailwind`w-50 h-50 mb-10 self-center`}
                        />
                        <Text style={tailwind`text-base self-center font-bold`}>Chưa có đơn hàng</Text>
                    </View>
                    :
                    <CheckPayScreenFix orderList={data} />
                )}
        </View>
    )
}

export default NewOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})