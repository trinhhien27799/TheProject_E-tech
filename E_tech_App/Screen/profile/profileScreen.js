import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground, FlatList, Alert } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import OrderSreen from "./orderSreen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getUser, setAddress, setUser } from "../../session"
import { deleteDeviceToken } from "../../CallApi/tokenDeviceApi"
import * as ImagePicker from 'expo-image-picker';
import { useRequireLogin } from "../../utils/alert"
import { updateImage } from "../../CallApi/userApi"

const Profile = () => {
    const navigation = useNavigation()

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderProfile navigation={navigation} />
            <View style={{ marginTop: 30 }}>
                <OrderSreen />
                <TouchableOpacity
                    onPress={() => {
                        if (getUser() == null) {
                            useRequireLogin(navigation)
                            return
                        }
                        navigation.navigate('MyVoucher')
                    }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../assets/voucher.png')} />
                        <Text>Mã giảm giá đã lưu</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (getUser() == null) {
                            useRequireLogin(navigation)
                            return
                        }
                        navigation.navigate('FavoriteScreen')
                    }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../img/heart.png')} />
                        <Text>Đã thích</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (getUser() == null) {
                            useRequireLogin(navigation)
                            return
                        }
                        navigation.navigate('AddressScreen')
                    }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../assets/contact-list.png')} />
                        <Text>Sổ địa chỉ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (getUser() == null) {
                            useRequireLogin(navigation)
                            return
                        }
                        navigation.navigate('ResetPassword')
                    }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../assets/synchronize.png')} />
                        <Text>Đổi mật khẩu</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ContactScreen')
                    }}>
                    <View style={styles.viewItem}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../assets/help-desk.png')} />
                        <Text>Liên hệ</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const HeaderProfile = ({ navigation }) => {


    const [fullname, setFullname] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [background, setBackground] = useState(null)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const img = 'https://th.bing.com/th/id/R.ef29b9a065d7450a0a2a58aa89278ccc?rik=B3%2b8nQn%2bnxpA0Q&pid=ImgRaw&r=0'
            if (!getUser()) {
                setFullname('Đăng nhập ngay')
                setAvatar(img)
                setBackground(img)
            } else {
                setFullname(getUser().fullname ?? '')
                setAvatar(getUser().avatar ?? img)
                setBackground(getUser().background ?? img)
            }
        })
        return unsubscribe
    }, [navigation])

    const imagePicker = async (type) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                if (type === 'avatar') {
                    setAvatar(result.assets[0].uri)
                } else {
                    setBackground(result.assets[0].uri)
                }
                const response = await updateImage(result.assets[0].uri, type)
                if (response.code == 200) { setUser(response) } else { Alert.alert('Đã xảy ra lỗi', response.message) }
            }
        } catch (error) {
            console.log(`update ${type}:`, error)
        }
    }


    const Logout = () => {
        if (getUser() == null) {
            navigation.navigate('Login')
            return
        }
        Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất tài khoản khỏi thiết bị!', [
            {
                text: 'Hủy',
                onPress: () => { },
            },
            {
                text: 'OK',
                onPress: () => {
                    deleteDeviceToken()
                    clearAsyncStorage(['token', 'notification', 'bill0', 'bill1','history','product_recent'])
                    setUser(null)
                    setAddress(null)
                    navigation.replace('Login')
                }
            },
        ])
    }

    const clearAsyncStorage = async (array) => {
        if (array != null && array.length > 0) {
            Promise.all(array.map((item) => {
                try {
                    AsyncStorage.removeItem(item)
                    console.log(`${item} đã được xóa thành công.`)
                } catch (error) {
                    console.error(`Lỗi khi xóa ${item} :`, error)
                }
            }))
        }
    }

    return (
        background &&
        <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={styles.viewIcon}
            >
                <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/previous.png')} />
            </TouchableOpacity>
            {background &&
                <TouchableOpacity style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
                    onPress={() => {
                        if (!getUser()) {
                            useRequireLogin(navigation)
                        } else {
                            imagePicker('background')
                        }
                    }}>
                    <Image style={styles.background} source={{ uri: background }} />
                </TouchableOpacity>
            }
            <View style={{
                position: 'absolute',
                flex: 1,
                top: '70%',
                width: Dimensions.get("window").width,
                alignItems: 'center',
                zIndex: 1
            }}>
                {avatar &&
                    <TouchableOpacity
                        onPress={() => {
                            if (!getUser()) {
                                useRequireLogin(navigation)
                            } else {
                                imagePicker('avatar')
                            }
                        }}>
                        <Image style={styles.imageHeader} source={{ uri: avatar }} />
                    </TouchableOpacity>}
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginTop: 10 }}>{fullname}</Text>
            </View>
            <TouchableOpacity
                onPress={Logout}
                style={styles.viewIcon}
            >
                {getUser() != null ?
                    <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/exit.png')} />
                    :
                    <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white', marginStart: -8 }} source={require('../../assets/login.png')} />
                }
            </TouchableOpacity>
        </View>
    )

}
export default Profile
const styles = StyleSheet.create({
    headerContainer: {
        height: Dimensions.get("window").height * 0.3,
        shadowColor: 'grey',
        shadowRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        backgroundColor: 'white'
    },
    imageHeader: {
        width: 125,
        height: 125,
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
        zIndex: 1
    },
    viewButton: {
        alignSelf: 'center',
        marginTop: '10%',
        alignItems: 'center',
        flexDirection: 'row',

    },
    viewItem: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'
    },
    background: {
        flex: 1
    }
})