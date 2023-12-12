import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground, FlatList, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import color from "../../colors";
import OrderSreen from "./orderSreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../../session";


const Profile = () => {
    const navigation = useNavigation();
    const [user,setUser] = useState(getUser());
    useFocusEffect(
        React.useCallback(()=>{
            const newUser = getUser();
            setUser(newUser);
        },[])
    );
    const clearToken = async () => {
        try {
            await AsyncStorage.removeItem('token');
            console.log('Token đã được xóa thành công.');
        } catch (error) {
            console.error('Lỗi khi xóa token:', error);
        }
    };
    const Logout = ()=>{
        Alert.alert('Đăng xuất','Bạn có muốn đăng xuất !!!',[
            {
                text:'Hủy',
                onPress: () => {},
            },
            {
                text: 'OK',
                 onPress: () => {
                    clearToken();
                    navigation.replace('Login');
                }
            },
        ])
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderProfile navigation={navigation} onPress={Logout} user={user}/>
            <View>
                <TouchableOpacity style={styles.viewEdit}
                    onPress={() => { navigation.navigate('EditProfile') }}
                >

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Edit Profile</Text>
                </TouchableOpacity>
                <OrderSreen />

                <TouchableOpacity
                    onPress={() => { navigation.navigate('MyVoucher') }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../assets/voucher.png')} />
                        <Text>Mã giảm giá đã lưu</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('FavoriteScreen') }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../img/heart.png')} />
                        <Text>Đã thích</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('AddressScreen') }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../assets/contact-list.png')} />
                        <Text>Sổ địa chỉ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('ResetPassword') }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../assets/synchronize.png')} />
                        <Text>Đổi mật khẩu</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const HeaderProfile = ({ navigation,onPress,user }) => {
    return (
        <ImageBackground source={{ uri: user.background }} style={[{ backgroundColor: 'transparent' }, styles.headerContainer]}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={styles.viewIcon}
            >
                <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/previous.png')} />
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                flex: 1,
                top: '70%',
                left: Dimensions.get("window").height * .12
            }}>
                <View style={styles.viewAvatar}>
                    <Image style={styles.imageHeader} source={{ uri: user.avatar }} />
                </View>
                <View style={{ flexDirection: 'column', marginVertical: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', textAlign: 'center' }}>{user.fullname}</Text>
                    <Text style={{ marginTop: 15, color: 'black', textAlign: 'center' }}>{user.username}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.viewIcon}
            >
                <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/exit.png')} />
            </TouchableOpacity>
        </ImageBackground>
    );
    
}
export default Profile;
const styles = StyleSheet.create({
    headerContainer: {
        height: Dimensions.get("window").height * 0.3,
        shadowColor: 'grey',
        shadowRadius: 20,
        marginBottom: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageHeader: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 100,
    },
    viewIcon: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        margin: '5%',
        position: 'relative',
    },
    viewButton: {
        alignSelf: 'center',
        marginTop: '10%',
        alignItems: 'center',
        flexDirection: 'row',

    },
    viewEdit: {
        backgroundColor: '#3D405B',
        width: 150,
        height: 50,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 10,
        shadowColor: 'grey',
        shadowRadius: 10,
        shadowOffset: { width: -5, height: 5 },
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    viewAvatar: {
        height: 125,
        width: 125,
        borderRadius: 100,
        backgroundColor: color.conHang,
        alignSelf: 'center'
    },
    viewItem: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'
    }
});