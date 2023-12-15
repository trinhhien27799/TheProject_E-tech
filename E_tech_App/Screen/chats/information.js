import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const Information = () => {
    return (
            <View style={styles.container}>
                <Text>Thông tin</Text>
            </View>
    )
}
export default Information;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 10,
        width: Dimensions.get('window').width * .6,
        borderRadius: 20,
        padding: 10
    },
});