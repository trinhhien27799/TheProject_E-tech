import { Dimensions, Text, View, StyleSheet } from "react-native"
import LottieView from 'lottie-react-native'

const LoadingWidget = () => {
    return (
        <View>
            <LottieView
                autoPlay
                style={[styles.viewLoading]}
                source={require('../assets/logo.json')}
            />
        </View>
    )
}
export default LoadingWidget;
const styles = StyleSheet.create({
    viewLoading: {
        height: 45,
        width: 45,
        marginTop:20
    }
});