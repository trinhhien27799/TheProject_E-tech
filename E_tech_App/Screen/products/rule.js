import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import colors from '../../Component/colors';
import { Ionicons } from "@expo/vector-icons";


const Rule = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold' }}>Thông tin sản phẩm</Text>
            <View style={{ width: Dimensions.get('screen').width * 0.7 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Ionicons name="phone-portrait-sharp" size={20} />
                    <Text> Mới, đầy đủ phụ kiện từ nhà sản xuất</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Ionicons name="shield-checkmark" size={20} />
                    <Text> Bảo hành 12 tháng tại trung tâm bảo hành  Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image source={require('../../img/vat.png')} style={{ height: 20, width: 20 }} />
                    <Text> Giá đã bao gồm thuế</Text>
                </View>
            </View>
        </View>
    )
}


export default Rule
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.2,
        borderColor: colors.grey,
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 8
    }
});
