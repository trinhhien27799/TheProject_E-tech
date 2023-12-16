import { FlatList, StyleSheet, View } from "react-native"
import ItemContact from "./ItemContact"


const ContactScreen = () => {

    const data = ['facebook','messenger', 'zalo', 'numberphone', 'instagram']


    const renderItem = ({ item }) => {
        return (
            <ItemContact name={item} />
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                key={(index) => index.toString()}
                renderItem={renderItem}
                style={styles.list} />
        </View>
    )
}

export default ContactScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1,
    }
})