import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import HeaderItem from "../../Component/headerItem";
import { Ionicons } from "@expo/vector-icons";
import { resetPassword } from "../../CallApi/userApi";
import { useNavigation, useRoute } from "@react-navigation/native";
const ResetPassword = ({route}) => {
    const navigation = useNavigation();
    const username = route.params.username;
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [isNewPassword, setNewPassword] = useState(false);
    const [isConfirmPassword, setConfirmPassword] = useState(false);
    const [isPassword, setIsPassword] = useState('');
    const [isNewPass, setIsNewPass] = useState('');
    const [isConfirmPass, setIsConfirmPass] = useState('');
    const [error, setError] = useState('');
    const [passWordError, setPassWordError] = useState('');
    const [confirmPassErr, setconfirmPassErr] = useState('');

    const handlSave = () => {

        if (validate()) {
            resetPassword(username,isPassword,isNewPass);

        }
    }
    const validate = () => {
        if (isPassword.length == 0 || isNewPass.length == 0 || isConfirmPass.length == 0) {
            setError("Vui lòng điền đầy đủ thông tin")
            setPassWordError("Vui lòng điền đầy đủ thông tin");
            setconfirmPassErr("Vui lòng điền đầy đủ thông tin")
            return false;
        } else
        if (isPassword.length < 6 || isNewPass.length < 6 || isConfirmPass.length < 6) {
            setError("Mật khẩu phải trên 6 ký tự")
            setPassWordError("Mật khẩu phải trên 6 ký tự");
            setconfirmPassErr("Mật khẩu phải trên 6 ký tự")
            return false;
        }else
            if (isPassword == isNewPass) {
                setError('')
                setconfirmPassErr('')
                setPassWordError("Mật khẩu mới không được trùng mật khẩu cũ")
                return false;
            } else
                if (isNewPass != isConfirmPass) {
                    setPassWordError('');
                    setconfirmPassErr("Mật khẩu không trùng khớp");
                    return false;
                } else
                    setconfirmPassErr('')
        return true;

    }


    return (
        <View style={styles.viewContainer}>
            <HeaderItem title={'ResetPassword'} />
            <TextFields title={'Nhập mật khẩu'} setPasswordShow={setPasswordShow} isPasswordShow={isPasswordShow} setChangeText={setIsPassword} />
            {error && (<Text style={{ color: 'red', marginLeft: '5%' }}>{error}</Text>)}
            <TextFields title={'Nhập mật khẩu mới'} setPasswordShow={setNewPassword} isPasswordShow={isNewPassword} setChangeText={setIsNewPass} />
            {passWordError && (<Text style={{ color: 'red', marginLeft: '5%' }}>{passWordError}</Text>)}
            <TextFields title={'Nhập lại mật khẩu'} setPasswordShow={setConfirmPassword} isPasswordShow={isConfirmPassword} setChangeText={setIsConfirmPass} />
            {confirmPassErr && (<Text style={{ color: 'red', marginLeft: '5%' }}>{confirmPassErr}</Text>)}
            <TouchableOpacity
                style={styles.buttonSave}
                onPress={handlSave}
            >
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                    Thay đổi mật khẩu
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const TextFields = ({ setPasswordShow, isPasswordShow, title, setChangeText }) => {
    return (
        <View style={{ margin: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            <View style={styles.viewInput}>
                <TextInput
                    style={styles.textField}
                    secureTextEntry={!isPasswordShow}
                    onChangeText={(text) => setChangeText(text)}
                />
                <TouchableOpacity
                    onPress={() => {
                        setPasswordShow(!isPasswordShow);
                    }}
                >
                    <Ionicons size={15} name={isPasswordShow ? 'eye-off' : 'eye'} />
                </TouchableOpacity>

            </View>
        </View>

    )
}

export default ResetPassword;
const styles = StyleSheet.create({
    viewContainer: {
        marginTop: '10%',
        justifyContent: 'center',
    },
    viewInput: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
        padding: '3%',
        borderColor: 'grey',
        alignItems: 'center',
    },
    textField: {
        flex: 1
    },
    buttonSave: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 200,
        height: 50,
        backgroundColor: '#2180F1',
        marginTop: '5%',
        borderRadius: 10,
    }
});
