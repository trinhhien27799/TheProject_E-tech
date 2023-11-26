import { Dimensions, Text, View, StyleSheet } from "react-native"
import LottieView from 'lottie-react-native'

const LoadingWidget = () => {
    return (
        <View>
            <LottieView
                autoPlay
                style={[styles.container]}
                source={require('../assets/logo.json')}
            />
        </View>
    )
}
export default LoadingWidget;
const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 100,
        marginTop: Dimensions.get('window').height * 0.3,
        justifyContent: 'center',
        alignSelf: 'center'
    }
});