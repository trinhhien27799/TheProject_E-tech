import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text,  Dimensions, TouchableOpacity } from "react-native";



const OtherScreen = ({addChats}) => {
    const Counsel = ()=>{
        addChats('Tư vấn sản phẩm',true,0);
        
    }
    const Information = ()=>{
        addChats('Thông tin đơn hàng',true,0)
        
    }
    const Voucher = ()=>{
        addChats('Xem voucher',true,0);
        
    }
    const Counselors = ()=>{
        addChats('Gặp tư vấn viên',true,0);
        
    }
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:"bold",fontSize:15}}><Ionicons name="chatbubble-ellipses-sharp" color={'#0099FF'} size={15} />  Câu hỏi thường gặp ???</Text>
            <View
                style={{
                    height: 1,
                    width: "100%",
                    marginTop:5,
                    backgroundColor: "rgba(128, 128, 128, 0.2)", 
                }}
            />
            <TextButton title={'Tư vấn sản phẩm'} onpress={Counsel}/>
            <TextButton title={'Thông tin đơn hàng'} onpress={Information}/>
            <TextButton title={'Xem voucher'} onpress={Voucher}/>
            <TextButton title={'Gặp tư vấn viên'} onpress={Counselors}/>
        </View>
    )
}

const TextButton = ({title,onpress})=>{
    return(
       <View>
         <TouchableOpacity
            onPress={onpress}
            style={{marginTop:10,marginBottom:10}}
        >
            <Text style={{fontSize:15}}>{title}</Text>
        
        </TouchableOpacity>
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#F3F7F7",
                marginTop:5,
                backgroundColor: "rgba(128, 128, 128, 0.2)", 
            }}
        />
       </View>
        
    )
}

export default OtherScreen;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: 'white',
        width: Dimensions.get('window').width * .7,
        borderRadius: 20,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 5
    }
})