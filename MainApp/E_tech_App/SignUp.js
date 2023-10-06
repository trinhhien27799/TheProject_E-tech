import React from "react";
import { Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';


const SignUp = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.view}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: 'black', marginTop: 40 }}>
                        Đăng ký
                    </Text>

                </View>
                <View style={{ marginBottom: 12 }}>
                    <View style={styles.viewInput}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor={'black'}
                            style={{ width: '100%' }}
                            right={<TextInput.Icon name={'user'} size={28} />}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>

                    <View style={styles.viewInput}>
                        <TextInput
                            placeholder="Mật khẩu"
                            placeholderTextColor={'black'}
                            style={{ width: '100%' }}
                        />

                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <View style={styles.viewInput}>
                        <TextInput
                            placeholder="Xác nhận mật khẩu"
                            placeholderTextColor={'black'}
                            style={{ width: '100%' }}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <View style={styles.viewInput}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'black'}
                            style={{ width: '100%' }}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <View style={styles.viewInput}>
                        <TextInput
                            placeholder="Số điện thoại"
                            placeholderTextColor={'black'}
                            style={{ width: '100%' }}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>ĐĂNG KÝ</Text>
                </TouchableOpacity>


            </View>

        </SafeAreaView>

    )

}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    view: {
        flex: 1,
        marginHorizontal: 22
    },
    viewInput: {
        width: '100%',
        height: 48,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22
    },

    button: {
        backgroundColor: '#336BFA',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        width: "50%",
        marginTop: 18,
    }
});

export default SignUp;