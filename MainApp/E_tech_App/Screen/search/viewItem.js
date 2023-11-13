import React, { useEffect, useState } from "react";
import { Image, View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RelaProduct from "./relaProduct";

const ViewItem = ({ route }) => {
    return (
        <ScrollView>
            <HeaderItem route={route.params.newSearchItem}/>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',margin:'5%'}}>
            <TouchableOpacity
            >
                <Image source={require('../../img/filter.png')} style={{height:15,width:15}}/>
            </TouchableOpacity>
            <Text style={{ fontSize: 10,marginLeft:15 }}>Filter</Text>
            </View>
            <RelaProduct brand={route.params.newSearchItem.brand_name}/>
        </ScrollView>
    );
}
const HeaderItem = ({route}) => {
    console.log(route);
    const routes = route.params;
    const navigation = useNavigation();
    return (
        <View style={styles.viewHeader}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Image style={{ height: 30, width: 30 }} source={require('../../img/previous.png')} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
                // navigation.navigate("SearchScreen", routes);
            }}
            style={styles.viewSearch}>
                <TextInput
                    style={styles.textInput}
                    value={route.product_name}
                    editable={false}
                />
                <TouchableOpacity
                >
                    <Ionicons size={20} name="search" style={{ color: 'gray' }} />
                </TouchableOpacity>
            </TouchableOpacity>
            
        </View>
    );
}
export default ViewItem;
const styles = StyleSheet.create({
    viewHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingTop: 40,
    },
    viewSearch: {
        height: 50,
        width: Dimensions.get('window').width - 100,
        marginLeft: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 5,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#1E90FF',
        marginRight: 10,

    },
    textInput: {
        height: 40,
        width: Dimensions.get('window').width - 200,
        color: 'grey'
    },
});