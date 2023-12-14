import { useState } from 'react'
import { addVoucher } from '../CallApi/voucherApi'
import LoadingWidget from '../Component/loading'
import { TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native'
import tailwind from 'twrnc'
import { formatPrice, formatTime } from '../utils/format'

const ItemVoucher = ({ item, index, setData, data }) => {
    const [loadingAdd, setLoadingAdd] = useState(false)
    const handleVoucher = async (voucherId, voucherCode) => {
        try {
            setLoadingAdd(true)
            const response = await addVoucher(voucherCode, voucherId)
            if (response.userId) {
                const newArray = data.filter(item => item._id !== voucherId)
                setData(newArray)
            } else {
                alert('Thêm thất bại')
            }
        } catch (error) {
            console.error('Add voucher:', error)
        } finally {
            setLoadingAdd(false)
        }
    }
    return (
        <View style={[tailwind`bg-white mt-2 p-3 w-96 self-center border border-slate-300 rounded-lg`, { alignItems: 'center' }]}>
            <View style={[tailwind`flex-row`, { alignItems: 'center' }]}>
                <Image source={require('../img/sale.png')} style={styles.img} />
                <View style={{ paddingTop: 10, width: '60%', marginLeft: 10 }}>
                    <Text style={tailwind`text-base font-bold mb-1`} >{item.description}</Text>
                    <Text>Đơn tối thiểu: {formatPrice(item.condition)}</Text>
                    <Text style={styles.title}>HSD: {formatTime(item.expiration_date)}</Text>
                </View>
            </View>


            {loadingAdd ?
                <View style={{ alignItems: 'center', paddingTop: 5 }}>
                    <LoadingWidget />
                </View> :
                <TouchableOpacity style={[tailwind`bg-blue-600 py-3 justify-center mt-5 rounded-md shadow-md`, { width: '90%' }]} onPress={() => {
                    handleVoucher(item._id, item.code)
                }}>
                    <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>Lưu</Text>

                </TouchableOpacity>}
        </View>
    )
}

export default ItemVoucher

const styles = StyleSheet.create({
    img: {
        height: 80,
        width: 90,
        marginLeft: 6,
        marginBottom: 8,
    },
    text: {
        marginLeft: 60,
        fontSize: 18,
    },

    title: {
        fontSize: 13,
        marginTop: 10,
    },
})