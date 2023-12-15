import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { setChat } from "../../session";

const CounselScreen = ({addChats}) => {
    const onPhone = ()=>{
        addChats("Điện thoại",true,1)
    }
    const Question = ()=>{
        addChats("Phụ kiện điện thoại",true,1)
    }
    return (
        <View >
            <QuestionCounel phone={onPhone} access={Question}/>
        </View>
    );
}
const QuestionCounel = ({phone,access}) => {
    return (
        <View>
            <View style={styles.container}>
            <Text>Bạn đang quan tâm đến sản phẩm nào ???</Text>
            </View>
            <View style={{ flexDirection: 'row' ,marginLeft:10}}>
                <TouchableOpacity
                    onPress={phone}
                    style={styles.viewButton}
                >
                    <Text>Điện thoại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={access}
                    style={styles.viewButton}
                
                >
                    <Text>Phụ kiện điện thoại</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
export default CounselScreen;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop:10,
        marginLeft: 10,
        width: Dimensions.get('window').width * .6,
        borderRadius: 20,
        padding: 10
    },
    viewButton: {
        backgroundColor: 'white',
        padding:10,
        borderRadius:10,
        margin:5
    }
});