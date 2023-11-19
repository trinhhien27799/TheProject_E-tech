import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native'
import { autoLogin } from '../../CallApi/authenApi'
<<<<<<<<< Temporary merge branch 1
import { getUser, setUser } from '../../session'
import { useNavigation } from '@react-navigation/native';
=========
import { setUser } from '../../session'
import { useNavigation } from '@react-navigation/native'
>>>>>>>>> Temporary merge branch 2

const SplashScreen = () => {
    const navigation = useNavigation()
    const login = async () => {
        try {
            const response = await autoLogin()
            if (response.code == 200) {
                setUser(response.user)
                // console.log("Đăng nhập thành công")
            }
        } catch (error) {
            console.log(`splash :${error}`)
        } finally {
<<<<<<<<< Temporary merge branch 1
            const user = getUser();
            console.log(user);
            navigation.navigate('ButtonNavigation',{registrationData:user})
=========
            navigation.replace('Home')
>>>>>>>>> Temporary merge branch 2
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
