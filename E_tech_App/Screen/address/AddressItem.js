import { useNavigation } from "@react-navigation/native"
import Checkbox from "expo-checkbox"
import { useEffect, useState } from "react"
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"

const AddressItem = ({ item, index, check, listCheck, setListCheck }) => {
    const [isChecked, setChecked] = useState(false)
    const navigation = useNavigation()

    const eventChecked = (checked) => {
        setChecked(checked)
        if (checked) {
            setListCheck((prevList) => [...prevList, item._id])
        } else {
            setListCheck(listCheck.filter(i => i !== item._id))
        }
    }

    useEffect(() => {
        if (listCheck.length == 0) setChecked(false)
    }, [listCheck])


    return (
        <View style={styles.container}>
            <Text style={styles.avatar}>
                {item.fullname[0].toUpperCase()}
            </Text>
            <View style={styles.viewItem}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../assets/male.png')} />
                    <Text style={styles.fullname}>{item.fullname}</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../assets/call.png')} />
                    <Text>Liên lạc: {item.numberphone}</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../assets/address.png')} />
                    <Text style={{ width: '90%' }}>Địa chỉ: {item.address}</Text>
                </View>
            </View>
            {check ?
                <Checkbox value={isChecked} onValueChange={(checked) => {
                    eventChecked(checked)
                }} />
                :
                <TouchableOpacity
                    onPress={() => { navigation.navigate('NewAddress', { address: item }) }}>
                    <Text style={{ color: 'grey' }}>Sửa</Text>
                </TouchableOpacity>}
        </View>
    )
}

export default AddressItem


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    avatar: {
        width: 50,
        height: 50,
        backgroundColor: '#e1e4fb',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 25,
        fontWeight: "bold",
        fontSize: 18,
        color: '#219ede'

    },
    icon: {
        width: 15,
        height: 15,
        marginEnd: 8
    },
    viewItem: {
        marginStart: 15,
        flex: 1,
    },
    fullname: {
        fontSize: 17,
        fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})