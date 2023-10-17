import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Image, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";



const MainHeader =({username})=>{
    return (
        <View style={styles.container}>
            <View style={styles.viewAvatar}>
                <Image style={{width:40,height:40,borderRadius:10}} source={{uri:'https://cdn.pixabay.com/photo/2023/10/02/14/00/egg-8289259_640.png'}}/>
                <Text style={{marginLeft:10,fontWeight:"bold"}}>{username}</Text>
            </View>
            <View style={styles.viewSearch}>
                <Ionicons style={{padding: 5}} name="search" size={25}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal:'5px',
        marginTop:15
    },
    viewAvatar:{
        height:60,
        width:200, 
        backgroundColor:'#FFFFFF',
        alignItems: 'center',
        alignSelf: 'center',
        padding:10,
        margin:10,
        borderRadius:5,
        shadowRadius:5,
        shadowColor:'gray',
        flexDirection:'row'
    }, 
    viewSearch:{
        height:40,
        width:40,
        backgroundColor:'white',
        alignItems: 'center',
        borderRadius:50,
        shadowRadius:2,
        marginRight:20,
    } ,
    title:{
        fontSize: 18,
        fontWeight:'bold',
    }
});
export default MainHeader;