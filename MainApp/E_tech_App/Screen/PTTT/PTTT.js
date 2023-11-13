import React, { useState } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    RadioButton,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PTTT = () => {
    const [selectedRadio, setSelectedRadio] = useState(1);
    const navigation = useNavigation();
    const Check = () => {
        if (setSelectedRadio == 1) {
            () => { navigation.goback() }
        } else {
            () => { navigation.navigate('DialogQR') }
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.view}>
                    <Text style={styles.text1}>Phương thức thanh toán</Text>
                </View>

                <TouchableOpacity style={{ marginTop: 50 }} onPress={() => { setSelectedRadio(1); }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: 30 }}>
                        <View style={styles.radio}>
                            {selectedRadio == 1 ? <View style={styles.radioBg}></View> : null}
                        </View>
                        <Text style={{ marginLeft: 5, fontSize: 15 }}>Thanh toán khi nhận hàng (Tiền mặt)</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => { setSelectedRadio(2); }} >
                        <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: 30 }}>
                            <View style={styles.radio}>
                                {selectedRadio == 2 ? <View style={styles.radioBg}></View> : null}
                            </View>
                            <Text style={{ marginLeft: 5, fontSize: 15 }}>Chuyển khoản qua ngân hàng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.view3}>
                    <TouchableOpacity style={styles.button2} onPress={() => { navigation.goback() }}>
                        <Text style={styles.text}>Hủy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button2} onPress={Check}>
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
        marginTop: 30,
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
