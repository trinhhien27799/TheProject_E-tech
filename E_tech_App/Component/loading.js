import { StyleSheet } from "react-native"
import LottieView from 'lottie-react-native'

const LoadingWidget = () => {
    return (
        <LottieView
            autoPlay
            style={[styles.viewLoading]}
            source={require('../assets/logo.json')}
        />
    )
}
export default LoadingWidget;
const styles = StyleSheet.create({
    viewLoading: {
        height: 40,
        width: 40,
        alignSelf:'center'
    }
});