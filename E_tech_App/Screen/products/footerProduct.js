import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View,Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
export default FooterProduct =()=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={[{backgroundColor:'#1E90FF'}, styles.boxButton]}>
                <Text style={{color:'white'}}>Thêm vào giỏi hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{borderColor:'#1E90FF',borderWidth:1},styles.boxButton]}>
                <Text>Mua ngay</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:50,
        justifyContent:'space-around',
        flexDirection:"row"
    },
    boxButton:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
        margin:5,
        flexDirection:'column'
    }
});