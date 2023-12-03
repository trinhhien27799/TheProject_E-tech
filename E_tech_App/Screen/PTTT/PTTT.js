import React, { useState } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';

const PTTT = () => {
    const [selectedRadio, setSelectedRadio] = useState(1);
    const navigation = useNavigation();
    
    const Check = (value) => {
        console.log(value);
        if (value == 1) {
            navigation.goBack() 
        } else {
            navigation.navigate('DialogQR') 
        }
    }

    const selectedButtonList = [
        {
            value: 1,
            name: 'Thanh toán bằng tiền mặt'
        },
        {
            value: 2,
            name: 'Thanh toán chuyển khoản (mã QR)'
        },
    ];

    const selectedCard = ({ item }) => {
        return (
            <View>
                <RadioButton value={item.value} />
                <Text>{item.name}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.view}>
                    <Text style={styles.text1}>Phương thức thanh toán</Text>
                </View>

                {/* Flatlist */}
                <RadioButton.Group
                    onValueChange={(item) => setSelectedRadio(item)}
                    value={selectedRadio}
                >
                    <FlatList
                        data={selectedButtonList}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <RadioButton value={item.value} />
                                    <Text>{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                </RadioButton.Group>

                <View style={styles.view3}>
                    <TouchableOpacity style={styles.button2} onPress={() => { navigation.goBack() }}>
                        <Text style={styles.text}>Hủy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button2} onPress={() => Check(selectedRadio)}>
                        <Text style={styles.text}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 80,
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
        marginTop: 180,
    },
});
export default PTTT;
