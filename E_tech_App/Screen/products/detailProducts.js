import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Dimensions, FlatList } from "react-native";
import FooterProduct from "./footerProduct";
import BodyProducts from "./bodyProducts";
import colors from "../../Component/colors";
import { useNavigation } from "@react-navigation/native";
import useItemProduct from "../../Component/hooks/useItemProducts";
import LoadingWidget from "../../Component/loading";
import { getImage } from "../../Component/provider/itemProvider";
const DetailPoducts = ({route})=>{
    const {loading,dataItem} = useItemProduct(route.params.route._id);
    const variations = dataItem.variations;
    // useEffect(()=>{
        // setImage(route.params.route.image_preview);
        
    // })
    // const images = getImage();
    // console.log(images);
    const [image,setImage] = useState(route.params.route.image_preview);
    const [borderIndex,setBorderIndex] = useState(null);
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            {
                loading?
                <LoadingWidget isLoading={loading}/>:
                <>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                <View style={{flex:1}}>
                <View style={styles.viewImage}>
                    <Image style={styles.imagePd} source={{uri:image}}/>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        variations.map((item, index)=>(
                            <TouchableOpacity
                                onPress={()=>{
                                    setImage(item.image)
                                    setBorderIndex(index)
                                }}
                            >
                                <Image 
                            key={index}
                            source={{uri:item.image}} 
                            style={{height:100,width:100,margin:5,borderRadius:15,borderColor:borderIndex==index?colors.blue:null,borderWidth:1}}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                
               <TouchableOpacity
                    style={styles.viewPrevious}
                    onPress={()=>{
                        navigation.goBack();
                    }}
                >
                    <Ionicons name="arrow-back" size={20}/>
                </TouchableOpacity>
                </View>
                <BodyProducts route={dataItem}/>
                </ScrollView>
                <FooterProduct route={route.params} />
                </>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'linear-gradient(to bottom, #87CEEB, #FFFFFF)',
    },
    imagePd :{
        flex:1,
        resizeMode:'cover'
    },
    viewPrevious:{
        position:'absolute',
        width:40,
        marginTop:'10%',
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
