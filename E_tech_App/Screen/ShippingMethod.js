import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { getListShipping } from '../CallApi/shippingApi';
import { formatPrice } from '../utils/format';
import { setShipping, getShipping } from '../session';
import LoadingWidget from '../Component/loading';

const ShippingMethod = () => {
    const navigation = useNavigation();
    const [data, setData] = useState(null);
    const [selected, setSelected] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const data = await getListShipping();
            setData(data);
            setSelected(getShipping() ? getShipping()._id : data[0]._id)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchData();
    }, []);


    const ShippingItem = ({ item, index, selected, setSelected }) => {
        const [check, setCheck] = useState('unchecked')
        useEffect(() => {
            setCheck(selected == item._id ? 'checked' : 'unchecked')
        }, [selected])
        return (
            <View style={tailwind`flex-auto flex-row mb-5 bg-slate-50 py-3 rounded-md border border-gray-400`}>
                <RadioButton value={item} status={check} />
                <View style={{ flex: 1, justifyContent: 'center' }}
                    onTouchStart={() => {
                        setSelected(item._id)
                        setShipping(item)
                    }}>
                    <Text style={{ fontSize: 16 }}>{item.name} ({formatPrice(item.price)})</Text>
                </View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, padding: 20 }}>
            {loading ? <LoadingWidget /> :
                <>
                    <RadioButton.Group
                        onValueChange={(item) => {
                            setSelected(item._id)
                            setShipping(item)
                        }}
                    >
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={data}
                            renderItem={({ item, index }) => (
                                <ShippingItem index={index} item={item} selected={selected} setSelected={setSelected} />
                            )}
                        />
                    </RadioButton.Group>


                    <TouchableOpacity
                        style={{ backgroundColor: 'green', padding: 20, borderRadius: 8, alignItems: 'center' }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ color: 'white', fontSize: 17 }}>Xác nhận</Text>
                    </TouchableOpacity></>}
        </View>

    )
}
export default ShippingMethod;
