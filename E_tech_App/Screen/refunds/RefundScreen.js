import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View, TouchableOpacity, Text, Dimensions } from "react-native"
import LoadingWidget from "../../Component/loading"
import { useNavigation } from "@react-navigation/native"
import { getRefunds } from "../../CallApi/RefundsApi"
import LottieView from 'lottie-react-native'
import { getUser } from "../../session"
import { formatTime } from "../../utils/format"


const RefundScreen = () => {

    const listStatus = [
        {
            value: 0,
            text: 'Chờ xác nhận'
        },
        {
            value: 1,
            text: 'Đã hoàn tiền'
        },
    ]

    const [value, setValue] = useState(0)

    const ButtonCard = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    height: 40, paddingHorizontal: 15, paddingVertical: 7,
                    backgroundColor: '#eeeeee', borderRadius: 8, marginHorizontal: 10, borderColor: '#209ce2',
                    borderWidth: item.value == value ? 2 : 0,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    setValue(item.value)
                    fetchData(item.value)
                }}
            >
                <Text>{item.text}</Text>
            </TouchableOpacity>
        )
    }

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('OrderDetailScreen', { dataId: item.billId })}
                style={styles.item}>
                <Text style={{ fontWeight: '500', fontSize: 17, color: item.status == 0 ? 'red' : item.status == 1 ? 'yellow' : 'green' }}>#{item.billId}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <LottieView
                        autoPlay
                        style={{ width: 36, height: 36 }}
                        source={require('../../assets/refunds.json')}
                    />
                    <Text style={{ marginStart: 10, flex: 1 }}>Yêu cầu hoàn tiền cho đơn hàng đã được {item.status == 0 ? 'tạo thành công' : item.status == 1 ? 'xác nhận thành công' : 'hoàn thành'} vào lúc {formatTime(item.time)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const fetchData = async (value) => {
        try {
            setLoading(true)
            const response = await getRefunds(value)
            if (response.code == 200) {
                setData(response.data)
            }
        } catch (error) {
            console.log('Refund:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData(value)
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={styles.container}>

            <FlatList
                showsHorizontalScrollIndicator={false}
                data={listStatus}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ButtonCard}
                horizontal
                style={{ flexGrow: 0, width: Dimensions.get('window').width, backgroundColor: 'white', paddingVertical: 10 }}
            />
            {
                loading ?
                    <LoadingWidget />
                    :
                    (data.length == 0
                        ?
                        <View style={{ backgroundColor: 'whitesmoke', flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <LottieView
                                autoPlay
                                style={{ width: 200, height: 200 }}
                                source={require('../../assets/refunds.json')}
                            />
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('ButtonNavigation', { screen: 'Home' }) }}
                            >
                                <Text style={{ marginTop: 10, padding: 10 }}>Bạn không có yêu cầu nào</Text>
                            </TouchableOpacity>
                            <View style={{ height: '30%' }} />
                        </View>
                        :
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        />
                    )
            }

        </View>
    )
}

export default RefundScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: 'white',
        marginTop: 0.5,
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
        padding: 15
    }
})