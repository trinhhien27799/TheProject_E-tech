import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View,StyleSheet,Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import FooterProduct from "./footerProduct";
import BodyProducts from "./bodyProducts";
import { LinearGradient } from 'expo-linear-gradient';

const DetailPoducts = ({route})=>{
    return(
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
            <View style={{flex:1}}>
            <View style={styles.viewImage}>
                <Image style={styles.imagePd} source={{uri:route.params.route.image_preview}}/>
            </View>
           <TouchableOpacity
                style={styles.viewPrevious}
            >
                <Ionicons name="arrow-back" size={20}/>
            </TouchableOpacity>
            </View>
            <BodyProducts route={route.params.dataItem}/>
            </ScrollView>
            <FooterProduct />
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:'5%',
        backgroundColor: 'linear-gradient(to bottom, #87CEEB, #FFFFFF)',
    },
    imagePd :{
        flex:1,
        resizeMode:'cover'
    },
    viewPrevious:{
        position:'absolute',
        width:40,
        marginTop:'5%',
        margin:10,
        borderColor:'grey',
        borderWidth:1,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewImage:{
        height:Dimensions.get('window').height*0.5,
        width:'100%',
    }
});
export default DetailPoducts;