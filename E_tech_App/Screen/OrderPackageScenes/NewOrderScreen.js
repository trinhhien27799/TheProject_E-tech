import React, { useEffect, useRef, useState } from 'react'
import { Text, FlatList, TouchableOpacity, View, Dimensions } from 'react-native'
import tailwind from 'twrnc'
import { useNavigation, useRoute } from '@react-navigation/native'
import CheckPayScreenFix from './CheckPayScreenFix'
import { Image } from 'react-native'
import { getBillByStatus } from '../../CallApi/billApi'
import LoadingWidget from '../../Component/loading'



const NewOrderScreen = () => {
    const route = useRoute()
    const [value, setValue] = useState(route.params.getValueOrder)
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
            if (response) setData(response)
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
        <View style={{ backgroundColor: 'whitesmoke', alignItems: 'center', flex: 1, width: Dimensions.get('window').width }}>
            <View style={{
                backgroundColor: 'white', width: Dimensions.get('window').width, flexDirection: 'row',
                borderBottomColor: 'grey', borderBottomWidth: 1
            }}>
                <TouchableOpacity
                    style={tailwind`bg-white w-10 h-10 m-3 justify-center rounded-full shadow-md`}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require('../../img/previous.png')}
                        style={tailwind`w-7 h-7 self-center`}
                    />
                </TouchableOpacity>

                <Text style={tailwind`text-base font-bold mt-4.7`}>Đơn hàng của bạn</Text>
            </View>

            <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                <FlatList
                    ref={flatListRef}
                    data={buttonValueList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ButtonCard}
                    horizontal
                    style={{ flexGrow: 0, width: Dimensions.get('window').width }}
                />

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