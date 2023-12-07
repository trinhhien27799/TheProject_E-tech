
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import LoadingWidget from "../../Component/loading";
import { resetPassword } from "../../CallApi/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../../apiService";


const ResetPassword = () => {
    const [showPassOld, setShowPassOld] = useState(false)
    const [showPassNew, setShowPassNew] = useState(false)
    const [showPassNew2, setShowPassNew2] = useState(false)

    const [passOld, setPassOld] = useState('')
    const [passNew, setPassNew] = useState('')
    const [passNew2, setPassNew2] = useState('')


    const [warningPassOld, setWarningPassOld] = useState(null)
    const [warningPassNew, setWarningPassNew] = useState(null)
    const [warningPassNew2, setWarningPassNew2] = useState(null)

    const [checkRepeatPassword, setCheckRepeatPassword] = useState('')

    const [allowUpdate, setAllowUpdate] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setAllowUpdate(warningPassOld == false && warningPassNew == false && warningPassNew2 == false)
    }, [warningPassOld, warningPassNew, warningPassNew2])


    const onChangeTextPassOld = (text) => {
        const newText = text.toString().trim()
        setWarningPassOld(newText.length < 6)
        setPassOld(newText)
    }

    const onChangeTextPassNew = (text) => {
        const newText = text.toString().trim()
        setWarningPassNew(newText.length < 6)
        setPassNew(newText)
    }

    const onChangeTextPassNew2 = (text) => {
        const newText = text.toString().trim()
        if (newText.length < 6) {
            setWarningPassNew2(true)
            setCheckRepeatPassword("Mật khẩu nhiều hơn 5 kí tự...")
        } else {
            if (newText === passNew) {
                setWarningPassNew2(false)
            } else {
                setWarningPassNew2(true)
                setCheckRepeatPassword("Mật khẩu không trùng khớp...")
            }
        }
        setPassNew2(newText)
    }

    const updatePassword = async () => {
        try {
            setLoading(true)
            const response = await resetPassword(passOld, passNew)
            if (response.token) {
                setAuthToken(response.token)
                await AsyncStorage.setItem('token', response.token)
                alert("Cập nhật thành công")
            } else {
                alert(response)
            }

        } catch (error) {
            console.log('updatePassword: ', error)
            alert("Cập nhật thất bại")
        } finally {
            setLoading(false)
            setWarningPassOld(null)
            setWarningPassNew(null)
            setWarningPassNew2(null)
            setPassOld('')
            setPassNew('')
            setPassNew2('')
            setShowPassOld(false)
            setShowPassNew(false)
            setShowPassNew2(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nhập mật khẩu cũ:</Text>
            <View style={[styles.viewInput, { borderColor: warningPassOld == null ? 'black' : warningPassOld == true ? 'red' : 'green' }]}>
                <TextInput placeholder="Mật khẩu nhiều hơn 5 kí tự..." style={styles.textInput}
                    secureTextEntry={!showPassOld}
                    onChangeText={(text) => { onChangeTextPassOld(text) }}
                    value={passOld}
                />
                <TouchableOpacity
                    onPress={() => { setShowPassOld(!showPassOld) }}>
                    {showPassOld ?
                        <Image style={styles.icon} source={require('../../assets/vision.png')} />
                        :
                        <Image style={styles.icon} source={require('../../assets/hide.png')} />}
                </TouchableOpacity>
            </View>
            {warningPassOld && <Text style={{ color: 'red' }}>Mật khẩu nhiều hơn 5 kí tự...</Text>}

            <Text style={styles.title}>Nhập mật khẩu mới:</Text>
            <View style={[styles.viewInput, { borderColor: warningPassNew == null ? 'black' : warningPassNew == true ? 'red' : 'green' }]}>
                <TextInput placeholder="Mật khẩu nhiều hơn 5 kí tự..." style={styles.textInput}
                    secureTextEntry={!showPassNew}
                    onChangeText={(text) => { onChangeTextPassNew(text) }}
                    value={passNew}
                />
                <TouchableOpacity
                    onPress={() => { setShowPassNew(!showPassNew) }}>
                    {showPassNew ?
                        <Image style={styles.icon} source={require('../../assets/vision.png')} />
                        :
                        <Image style={styles.icon} source={require('../../assets/hide.png')} />}
                </TouchableOpacity>
            </View>
            {warningPassNew && <Text style={{ color: 'red' }}>Mật khẩu nhiều hơn 5 kí tự...</Text>}

            <Text style={styles.title}>Xác nhận mật khẩu mới:</Text>
            <View style={[styles.viewInput, { borderColor: warningPassNew2 == null ? 'black' : warningPassNew2 == true ? 'red' : 'green' }]}>
                <TextInput placeholder="Mật khẩu nhiều hơn 5 kí tự..." style={styles.textInput}
                    secureTextEntry={!showPassNew2}
                    onChangeText={(text) => { onChangeTextPassNew2(text) }}
                    value={passNew2}
                />
                <TouchableOpacity
                    onPress={() => { setShowPassNew2(!showPassNew2) }}>
                    {showPassNew2 ?
                        <Image style={styles.icon} source={require('../../assets/vision.png')} />
                        :
                        <Image style={styles.icon} source={require('../../assets/hide.png')} />}
                </TouchableOpacity>
            </View>
            {warningPassNew2 && <Text style={{ color: 'red' }}>{checkRepeatPassword}</Text>}
            <View style={{ height: 30, width: 0 }} />

            {loading ? <LoadingWidget /> :
                <TouchableOpacity
                    onPress={updatePassword}
                    disabled={!allowUpdate}
                    style={[styles.viewButton, { backgroundColor: allowUpdate ? 'green' : 'grey' }]}>
                    <Text style={styles.textButton}>Cập nhật</Text>
                </TouchableOpacity>}
        </View>
    )
}


export default ResetPassword;
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    title: {
        fontSize: 18,
        marginTop: 20
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 5
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'center',
    },
    textInput: {
        flex: 1,
        marginStart: 15
    },
    viewButton: {
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 15,
    },
    textButton: {
        color: 'white',
        fontSize: 18
    }

});
