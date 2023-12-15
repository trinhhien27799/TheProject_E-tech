import { Dimensions, StatusBar, StyleSheet, View } from "react-native"
import LottieView from 'lottie-react-native'

const LockLoading = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.5)" />
            <LottieView
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                }}
                source={require('../../assets/logo.json')}
            />
        </View>
    )
}

export default LockLoading

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center'
    }
})