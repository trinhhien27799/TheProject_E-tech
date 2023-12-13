import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Dimensions, View, Text, TouchableOpacity, Image } from "react-native"
import { StyleSheet } from "react-native"
import Modal from "react-native-modal"
import ViewModal from "./viewModal"
import { getProductSelected } from "../../session"

export default FooterProduct = ({product_name}) => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [dataIndex, setDataIndex] = useState([])
    const [option, setOption] = useState(false)


    const toggleModal = async () => {
        const data = getProductSelected()
        setDataIndex(data)
        setIsModalVisible(!isModalVisible)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    toggleModal()
                    setOption(false)
                }}
                style={[{ backgroundColor: '#1E90FF' }, styles.boxButton]}
            >
                <Text style={{ color: 'white' }}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    toggleModal()
                    setOption(true)
                }}
                style={[{ borderColor: '#1E90FF', borderWidth: 1 }, styles.boxButton]}
            >
                <Text>Mua ngay</Text>
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                backdropOpacity={0.4}
                style={{ margin: 0 }}
            >
                <View style={styles.modalContainer}>
                    <View style={{ flex: 1 }} />
                    <ViewModal product_name={product_name} data={dataIndex} setIsModalVisible={setIsModalVisible} option={option} />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flexGrow: 0,
        paddingVertical: 16,
        justifyContent: 'space-around',
        flexDirection: "row"
    },
    boxButton: {
        width: Dimensions.get('window').width * 0.4,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        margin: 5,
        flexDirection: 'column'
    },
    modalContainer: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
    },
})
