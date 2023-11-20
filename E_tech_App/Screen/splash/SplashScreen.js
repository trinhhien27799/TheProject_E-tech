import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native'
import { autoLogin } from '../../CallApi/authenApi'

import { setToken, setUser } from '../../session'
import { useNavigation } from '@react-navigation/native'


const SplashScreen = () => {
    const navigation = useNavigation()
    const login = async () => {
        try {
            const response = await autoLogin();
            console.log(response);
            if (response.code == 200) {
                setUser(response.user)
                console.log("Đăng nhập thành công")
            } else {
                setToken(null)
            }
        } catch (error) {
            console.log(`splash :${error}`)
        } finally {
            navigation.replace('Home')
        }
    }
    useEffect(() => {
        login()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="white" />
            <LottieView
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'white',
                }}
                source={require('../../assets/logo.json')}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default SplashScreen
