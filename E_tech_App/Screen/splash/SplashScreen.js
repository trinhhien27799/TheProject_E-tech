import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native'
import { autoLogin } from '../../CallApi/authenApi'
import { getUser, setAddress, setUser } from '../../session'
import { useNavigation } from '@react-navigation/native'
import { updateDeviceToken } from '../../CallApi/tokenDeviceApi'

const SplashScreen = () => {
    const navigation = useNavigation()
    const login = async () => {
        try {
                const response = await autoLogin();
                if (response.code == 200) {
                    setUser(response.user)
                    setAddress(response.user?.address ?? null)
                    console.log("Đăng nhập thành công")
                    await updateDeviceToken()
                }
        } catch (error) {
            console.log(`splash :${error}`)
        } finally {
            navigation.replace('ButtonNavigation');
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
