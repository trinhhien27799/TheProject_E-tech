import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import Dialog from "react-native-dialog";
import { verifyOTP, insertOtp } from '../../CallApi/authenApi';


const VerifyDialog = ({ email, visible, setVisble, countDown, setSatus, sendOTP, setLoading, setCountDown }) => {

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const [allow, setAllow] = useState(false)
    const [error, setError] = useState(null)


    const handleConfirm = async () => {
        try {
            setLoading(true)
            setVisble(false)
            const response = await verifyOTP(email, otp.join(''));
            setVisble(true)
            switch (response.code) {
                case 200: {
                    setVisble(false)
                    setSatus(true)
                    setError(null)
                    break
                }
                case 400: {
                    setLoading(false)
                    setError('Mã otp đã hết hạn')
                    break
                }
                case 404: {
                    setLoading(false)
                    setError('Mã otp không chính xác')
                    break
                }
                case 500: {
                    setLoading(false)
                    setError('Đã xảy ra lỗi trong quá trình xác minh mã otp')
                    break
                }

            }
        } catch (error) {
            setLoading(false)
            console.error("handleConfirm", error);
            setError('Đã xảy ra lỗi trong quá trình xác minh mã otp')
        }
    };





    return (
        <Dialog.Container visible={visible}>

            <Dialog.Title>Xác nhận email</Dialog.Title>
            <Dialog.Description>
                Vui lòng điền mã xác thực
            </Dialog.Description>
            <BoxVerity
                otp={otp}
                setOtp={setOtp}
                setAllow={setAllow}
            />
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            {countDown == 0 ? (
                <TouchableOpacity
                    onPress={sendOTP}
                >
                    <Text>Gửi lại mã xác nhận</Text>
                </TouchableOpacity>
            ) : (
                <Text style={{ color: 'red' }}>{countDown} giây</Text>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    onPress={() => {
                        setVisble(false)
                    }} >
                    <Text style={{ color: 'grey' }}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!allow}
                    style={{ marginStart: 20 }}
                    onPress={handleConfirm}>
                    <Text style={{ color: allow ? 'black' : 'grey' }}>Xác nhận</Text>
                </TouchableOpacity>



            </View>
        </Dialog.Container>
    );
}


const BoxVerity = ({ otp, setOtp, setAllow }) => {
    const firtInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourInput = useRef();
    const fiveInput = useRef();
    const sixInput = useRef();


    const setText = (pos, text) => {
        const array = otp
        array[pos - 1] = text
        setOtp(array)
        setAllow(pos == 6)
    }



    return (
        <View style={styles.boxContainer}>
            <View style={styles.otpBox}>
                <TextInput
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => {
                        setText(1, text)
                        if (text.length > 0) {
                            secondInput.current.focus()
                        }
                    }}
                    ref={firtInput}
                />
            </View>
            <View style={styles.otpBox}>
                <TextInput
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={secondInput}
                    onChangeText={(text) => {
                        setText(2, text)
                        if (text.length == 0) {
                            firtInput.current.focus()
                            return
                        }
                        thirdInput.current.focus()
                    }}

                />
            </View>
            <View style={styles.otpBox}>
                <TextInput
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={thirdInput}
                    onChangeText={(text) => {
                        setText(3, text)
                        if (text.length == 0) {
                            secondInput.current.focus()
                            return
                        }
                        fourInput.current.focus()
                    }}
                />
            </View>
            <View style={styles.otpBox}>
                <TextInput
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={fourInput}
                    onChangeText={(text) => {
                        setText(4, text)
                        if (text.length == 0) {
                            thirdInput.current.focus()
                            return
                        }
                        fiveInput.current.focus()
                    }}
                />
            </View>
            <View style={styles.otpBox}>
                <TextInput
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={fiveInput}
                    onChangeText={(text) => {
                        setText(5, text)
                        if (text.length == 0) {
                            fourInput.current.focus()
                            return
                        }
                        sixInput.current.focus()
                    }}
                />
            </View>
            <View style={styles.otpBox}>
                <TextInput
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={sixInput}
                    onChangeText={(text) => {
                        setText(6, text)
                        if (text.length == 0) {
                            fiveInput.current.focus()
                            return
                        }
                    }}
                />
            </View>
        </View>
    );
}


export default VerifyDialog;

const styles = StyleSheet.create({
    boxContainer: {
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    otpBox: {
        borderRadius: 5,
        height: 60,
        width: 50,
        margin: 10,
        borderColor: 'black',
        borderWidth: 0.5
    },
    otpText: {
        fontSize: 25,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10
    }
});