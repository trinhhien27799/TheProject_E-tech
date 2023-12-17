import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, Alert } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import OrderSreen from "./orderSreen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getUser, setAddress, setUser } from "../../session"
import { deleteDeviceToken } from "../../CallApi/tokenDeviceApi"
import * as ImagePicker from 'expo-image-picker';
import { useRequireLogin } from "../../utils/alert"
import { updateFullname, updateImage } from "../../CallApi/userApi"
import Dialog from "react-native-dialog";
import LockLoading from "../authentication/lockLoading"



const Profile = () => {
    const navigation = useNavigation()
    const [showEdit, setShowEdit] = useState(false)
    const [newName, setNewName] = useState('')
    const [warningEdit, setWarningEdit] = useState(null)
    const [fullname, setFullname] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUpdateFullname = async () => {
        try {
            setShowEdit(false)
            setLoading(true)
            const response = await updateFullname(newName)
            setLoading(false)
            if (response.code == 200) {
                setUser(response.user)
                setFullname(newName)
                Alert.alert('Thông báo', 'Cập nhật thành công', [{
                    text: 'Xác nhận',
                    onPress: () => setShowEdit(false)
                }])
            } else {
                Alert.alert('Thông báo', 'Cập nhật họ tên người dùng thất bại', [{
                    text: 'Xác nhận',
                    onPress: () => setShowEdit(false)
                }])
            }
        } catch (error) {
            setLoading(false)
            Alert.alert('Thông báo', 'Cập nhật họ tên người dùng thất bại', [{
                text: 'Xác nhận',
                onPress: () => setShowEdit(false)
            }])
        }
    }

    const convertFullname = (text) => {
        const name = String(text)
        if (name.trim().length == 0) {
            setNewName('')
            return
        }
        var lowerCaseName = name.replaceAll('  ', ' ').toLowerCase();
        var words = lowerCaseName.split(' ');
        for (var i = 0; i < words.length; i++) {
            const fisrt = words[i].charAt(0).toUpperCase()
            var last = words[i].slice(1);
            if (last[0] && last[0].toUpperCase() === fisrt) last = last.slice(1);
            words[i] = fisrt + last
        }
        var capitalizedFullName = words.join(' ');

        setNewName(capitalizedFullName)

        const regex = /^[^\d]+$/
        const check = regex.test(capitalizedFullName)
        setWarningEdit(!check)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, height: Dimensions.get('window').height }}>
                <HeaderProfile setLoading={setLoading} navigation={navigation} setShowEdit={setShowEdit} setNewName={setNewName} fullname={fullname} setFullname={setFullname} />
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
                            if (getUser() == null) {
                                useRequireLogin(navigation)
                                return
                            }
                            navigation.navigate('RefundScreen')
                        }}>
                        <View style={styles.viewItem}>
                            <Image style={{ height: 25, width: 25, alignSelf: "center", marginEnd: 15 }} source={require('../../assets/refund.png')} />
                            <Text>Hoàn tiền</Text>
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
                    <Dialog.Container visible={showEdit}>
                        <Text>Nhập tên mới</Text>
                        <TextInput
                            value={newName}
                            style={{ borderWidth: 1, borderColor: 'grey', paddingVertical: 5, paddingHorizontal: 8, borderRadius: 5 }}
                            placeholder="Nhập tên mới"
                            onChangeText={(text) => {
                                convertFullname(text)
                            }}
                            onEndEditing={() => {
                                setNewName(newName.trim())
                            }}
                        />
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>  {warningEdit == '' ? null : warningEdit == true ? 'Vui lòng nhập đúng tên' : ''}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setNewName(getUser()?.fullname ?? '')
                                    setShowEdit(false)
                                }}>
                                <Text style={{ color: 'grey' }}>Quay lại</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleUpdateFullname}
                                style={{ marginStart: 15 }}>
                                <Text
                                    style={{ color: warningEdit ? 'grey' : 'black' }}>Cập nhật</Text>
                            </TouchableOpacity>
                        </View>
                    </Dialog.Container>
                </View>
                {loading && <LockLoading />}
            </View>
        </ScrollView>
    )
}
const HeaderProfile = ({ setLoading, navigation, setShowEdit, setNewName, fullname, setFullname }) => {



    const [avatar, setAvatar] = useState(null)
    const [background, setBackground] = useState(null)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const bg = require('../../assets/bg.jpg')
            const av = require('../../assets/logo.jpg')
            setFullname(getUser()?.fullname ?? 'Đăng nhập ngay')
            setAvatar(getUser() ? { uri: getUser().avatar } : av)
            setBackground(getUser() ? { uri: getUser().background } : bg)
            setNewName(getUser()?.fullname ?? '')
        })
        return unsubscribe
    }, [navigation])

    const imagePicker = async (type) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: type === 'avatar' ? [1, 1] : [4, 3],
                quality: 0.5,
            });

            if (!result.canceled) {
                setLoading(true)
                const response = await updateImage(result.assets[0].uri, type)
                setLoading(false)
                if (response.code == 200) {
                    setUser(response.user)
                    if (type === 'avatar') {
                        setAvatar({ uri: result.assets[0].uri })
                    } else {
                        setBackground({ uri: result.assets[0].uri })
                    }
                    Alert.alert('Thông báo', 'Cập nhật ảnh thành công')
                } else {
                    setLoading(false)
                    setAvatar({ uri: getUser().avatar })
                    setBackground({ uri: getUser().background })
                    Alert.alert('Đã xảy ra lỗi', response.message)
                }
            }
        } catch (error) {
            console.log(`update ${type}:`, error)
            setLoading(false)
            setAvatar({ uri: getUser().avatar })
            setBackground({ uri: getUser().background })
            Alert.alert('Đã xảy ra lỗi', 'Hãy thử lại sau')
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
                    clearAsyncStorage(['token', 'notification', 'bill0', 'bill1', 'history', 'product_recent'])
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
                    <Image style={styles.background} source={background} />
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
                        <Image style={styles.imageHeader} source={avatar} />
                    </TouchableOpacity>}
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                    <View style={{ width: 31 }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', alignSelf: 'center' }}>{fullname}</Text>
                    {getUser() != null && <TouchableOpacity
                        onPress={() => {
                            setShowEdit(true)
                        }}>
                        <Image style={{ width: 20, height: 20, marginStart: 15 }} source={require('../../assets/edit.png')} />
                    </TouchableOpacity>}
                </View>
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