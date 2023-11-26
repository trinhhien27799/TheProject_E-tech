import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native'
import { autoLogin } from '../../CallApi/authenApi'

import { getUser, setToken, setUser } from '../../session'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation()
    const login = async () => {
        try {
            const response = await autoLogin();
            if (response.code == 200) {
                setUser(response.user)
            }
        } catch (error) {
            console.log(`splash :${error}`)
        } finally {
            const user = getUser();
            if(user == null) {
                navigation.navigate('Login');
            }
            else{
                navigation.navigate('ButtonNavigation', { registrationData: user });
            }
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
