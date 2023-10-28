import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TouchableOpacity, StyleSheet, Text, TextInput, Image, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { isValidEmail, isPassWord } from "../../Component/validation";
import { loginUser } from '../../CallApi/authenApi';

const Login = ({ navigation }) => {
    const [isPasswordShow, setisPasswordShow] = useState(false);
    const [isChecked, setIsChecker] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const isValidOk = () => !!email.trim() && !!password.trim();
    const handleLogin = async () => {
        try {
            const username = email;
            loginUser(username,password,navigation);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.view}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginVertical: 12, color: 'black' }}>
                        Đăng nhập
                    </Text>
                    <Text style={{ color: 'gray', marginBottom: 80 }}>
                        Vui lòng nhập username và mật khẩu của bạn
                    </Text>
                    <View>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 15 }}>Email hoặc số điện thoại</Text>
                        <View style={styles.viewInput}>
                            <Image source={require('../../img/mail.png')} style={{ height: 20, width: 20 }} />
                            <TextInput
                                placeholder="Email hoặc số điện thoại "
                                onChangeText={(text) => {
                                    setErrorEmail(isValidEmail(text) ? '' : 'Email hoặc số điện thoại không hợp lệ');
                                    setEmail(text);
                                }}
                                placeholderTextColor={'black'}
                                style={{ width: '100%', marginLeft: 10 }}
                            />
                        </View>
                        <Text style={{ color: 'red', margin: 10 }}>{errorEmail}</Text>
                    </View>
                    <View>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 15 }}>Mật khẩu</Text>
                        <View style={styles.viewInput}>
                            <Image source={require('../../img/password.png')} style={{ height: 20, width: 20 }} />
                            <TextInput
                                placeholder="Mật khẩu"
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrorPassword(isPassWord(text) ? '' : 'Mật khẩu lớn hơn 6 ký tự!');
                                }}
                                placeholderTextColor={'black'}
                                style={{ width: '100%', marginLeft: 10 }}
                                secureTextEntry={!isPasswordShow}
                            />
                            <TouchableOpacity
                                onPress={() => setisPasswordShow(!isPasswordShow)}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                }}

                            >
                                {
                                    isPasswordShow != true ? (
                                        <Ionicons name="eye-off" size={24} color={'black'} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={'black'} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: 'red', margin: 10 }}>{errorPassword}</Text>
                    </View>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                        <Text style={styles.textForgot}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    disabled={!isValidOk()}
                    onPress={handleLogin}
                    style={[styles.button, { backgroundColor: isValidOk() == true ? '#336BFA' : 'grey' }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
                        ĐĂNG NHẬP
                    </Text>
                </TouchableOpacity>
                <View style={styles.view3}></View>
                <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                    <Text>Bạn chưa có tài khoản? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SignUp')
                        }}
                    >
                        <Text style={{ marginLeft: 10, color: '#336BFA',fontWeight:'bold' }}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>

    )

}
export default Login;
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    view: {
        flex: 1,
        marginHorizontal: 22,
        justifyContent: 'center'
    },
    textForgot: {
        fontSize: 16,
        color: '#336BFA',
        fontWeight: 'bold'

    },
    view3: {
        height: 2,
        width: '90%',
        backgroundColor: '#336BFA',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
    },
    button: {
        backgroundColor: '',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        width: '50%',
        marginTop: 50,
    },
    viewInput: {
        width: '100%',
        height: 55,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingLeft: 22,
        flexDirection: 'row'
    },
});