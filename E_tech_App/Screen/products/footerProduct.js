import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import ViewModal from "../../Component/viewModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Disclosure } from "@headlessui/react";

export default FooterProduct = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataIndex, setDataIndex] = useState([]);


    const toggleModal = async () => {
        const dataString = await AsyncStorage.getItem('dataSelect');
        const data = JSON.parse(dataString);
        setDataIndex(data);
        setIsModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={toggleModal}
                style={[{ backgroundColor: '#1E90FF' }, styles.boxButton]}
            >
                <Text style={{ color: 'white' }}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={toggleModal}
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
                    <ViewModal data={dataIndex} />
                </View>
            </Modal>
        </View>
    );
};

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
        height:45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        margin: 5,
        flexDirection: 'column'
    },
    modalContainer: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height * 0.5,
        marginTop: Dimensions.get('window').height * 0.5,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
    },
});
