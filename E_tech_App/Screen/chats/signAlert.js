import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SignAlert = ({ visible }) => {
    const [modalVisible, setModalVisible] = useState(visible);
    const onCancel = () => {
        setModalVisible(false);
    }
    const navigation = useNavigation()
    const onYes = ()=>{
        navigation.navigate('Login');
        setModalVisible(false);
    }
  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Vui lòng đăng nhập !!!</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onYes}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf:'center',
    width:Dimensions.get("window").width*.7,
    height:100
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    margin:10,
    fontSize:15
  },
});

export default SignAlert;
