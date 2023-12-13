import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import tailwind from 'twrnc';
import { getPayment, setPayment } from '../../session';


const PTTT = () => {

    const [selected, setSelected] = useState(1);
    const navigation = useNavigation();

    const data = [
        {
            id: '1',
            name: 'Thanh toán bằng tiền mặt'
        },
        {
            id: '2',
            name: 'Thanh toán bằng Momo'
        },
    ];

    useEffect(() => {
        const select = getPayment()?.id ?? data[0].id
        setSelected(select)
        setPayment(getPayment() ?? data[0])
    }, [])



    const ButtonCard = ({ item, index, selected, setSelected }) => {
        const [check, setCheck] = useState('unchecked')

        useEffect(() => {
            setCheck(selected == item.id ? 'checked' : 'unchecked')
        }, [selected])


        return (
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                <RadioButton value={item} status={check} />
                <View>
                    <Text style={{ fontSize: 16, marginStart: 10 }}>{item.name}</Text>
                </View>
            </View>
        )
    }

    return (


        <View style={tailwind`p-5`}>
            <RadioButton.Group
                onValueChange={(value) => {
                    setSelected(value.id)
                    setPayment(value)
                }}
            >
                <FlatList
                    data={data}
                    key={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <ButtonCard item={item} index={index} selected={selected} setSelected={setSelected} />
                    )}
                />
            </RadioButton.Group>


            <TouchableOpacity style={{ backgroundColor: 'green', padding: 15, borderRadius: 10, marginTop: 15 }} onPress={() => { navigation.goBack() }}>
                <Text style={tailwind`font-bold text-base text-white self-center`}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5
    },
    view: {
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    view3: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    text1: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    radio: {
        width: 22,
        height: 22,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 2,
    },
    radioBg: {
        backgroundColor: 'black',
        height: 15.5,
        width: 15.5,
        margin: 1,
        borderRadius: 15
    },
    button2: {
        backgroundColor: '#336BFA',
        width: '40%',
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
export default PTTT;
