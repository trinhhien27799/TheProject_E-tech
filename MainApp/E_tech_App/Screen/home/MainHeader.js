import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Profile from "../profile/profileScreen";
import tailwind from "twrnc";



const MainHeader = ({navigation,route }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {route:route })}
            >
                <Image style={{height:35,width:35}} source={require('../../img/appMenu.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.viewSearch}
                onPress={() => navigation.navigate('SearchScreen')}
            >
                <View style={{flexDirection:'row'}}>
                <Ionicons style={{ lineHeight:50 }} name="search" size={25} />
                <Text style={{lineHeight:50,marginLeft:5}}>Nhập nội dung cần tìm kiếm....</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5px',
        marginTop: 15,
        padding: 8,
    },
    viewAvatar: {
        // height: 80,
        // width: 200,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        shadowColor: 'gray',
        flexDirection: 'row',
    },
    viewSearch: {
        height: 55,
        width: 250,
        paddingLeft:20,
        borderRadius: 50,
        borderWidth: 2,
        borderColor:'grey',
        marginRight: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});
export default MainHeader;