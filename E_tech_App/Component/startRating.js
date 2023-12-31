import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default sStartRatings = ({ route, size }) => {
    let stars = [];
    for (let x = 1; x <= 5; x++) {
        stars.push(
            <TouchableWithoutFeedback key={x} >
                <Animated.View>
                    <FontAwesome
                        name={x <= route ? "star" : "star-o"}
                        color='#f6c204'
                        size={size}
                        style={{ marginHorizontal: 2 }}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>{stars}</View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'flex-start',
    },

});