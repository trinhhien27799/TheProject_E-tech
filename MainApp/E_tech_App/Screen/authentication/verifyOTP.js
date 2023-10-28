import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import { verifyOTP, registerUser,insertOtp } from '../../CallApi/authenApi';

const VerifyDialog = ({ check, onCancle, email, password, fullname, navigation, remainingTime, setRemainingTime }) => {
    const firtInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourInput = useRef();
    const fiveInput = useRef();
    const sixInput = useRef();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const displayAlert = (message) => {
        alert(message);
    };
    const handleConfirm = async ({ email, password, fullname, navigation }) => {
        const otpString = otp.join("");
        const verificationResult = await verifyOTP(email, otpString);
        const registrationResult = await registerUser(fullname, email, password, navigation);
        if (verificationResult.code == 400 && registrationResult.code == 500) {
            displayAlert("Tạo tài khoản thất bại");
        } else {
            if (verificationResult.code == 400) {
                displayAlert("Mã xác minh hết hạn");

            } if (registrationResult.code == 500) {
                displayAlert("Email đã tồn tại");
            }
        }


    }




    return (
        <Dialog.Container visible={check}>

            <Dialog.Title>Xác nhận email</Dialog.Title>
            <Dialog.Description>
                Vui lòng điền mã xác thực
            </Dialog.Description>
            <BoxVerity
                firtInput={firtInput}
                secondInput={secondInput}
                thirdInput={thirdInput}
                fourInput={fourInput}
                fiveInput={fiveInput}
                sixInput={sixInput}
                otp={otp}
                onOtpChange={handleOtpChange}
            />
            {remainingTime == 0 ? (
                <TouchableOpacity
                    onPress={() => {
                        setRemainingTime(15),
                            insertOtp(email)
                    }
                    }
                >
                    <Text>Gửi lại mã xác nhận</Text>
                </TouchableOpacity>
            ) : (
                <Text style={{ color: 'red' }}>{remainingTime} giây</Text>
            )}
            <Dialog.Button label="Cancle" onPress={onCancle} />
            <Dialog.Button label="Confirm" onPress={() => handleConfirm({ email: email, fullname: fullname, password: password, navigation: navigation })} />
        </Dialog.Container>
    );
}
const BoxVerity = ({ firtInput, secondInput, thirdInput, fourInput, fiveInput, sixInput, onOtpChange }) => {
    return (
        <View style={styles.boxContainer}>
            <View style={styles.otpBox}>
                <TextInput
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={
                        (text) => {
                            text && secondInput.current.focus();
                            onOtpChange(0, text);
                        }
                    }
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
                        text && thirdInput.current.focus();
                        onOtpChange(1, text);
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
                        text && fourInput.current.focus();
                        onOtpChange(2, text);
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
                        text && fiveInput.current.focus();
                        onOtpChange(3, text);
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
                        text && sixInput.current.focus();
                        onOtpChange(4, text);
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
                        onOtpChange(5, text);
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