import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import ViewModal from "../../Component/viewModal";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default FooterProduct = ({ route }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataIndex,setDataIndex] = useState([]);

   
    const toggleModal = async() => {
        const dataString  = await AsyncStorage.getItem('dataSelect');
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
                    <ViewModal route={route} data={dataIndex}/>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 50,
        justifyContent: 'space-around',
        flexDirection: "row"
    },
    boxButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        margin: 5,
        flexDirection: 'column'
    },
    modalContainer: {
        backgroundColor: 'white',
        // padding: 20,
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
