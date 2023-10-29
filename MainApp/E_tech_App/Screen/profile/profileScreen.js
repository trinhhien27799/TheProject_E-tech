import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import editProfile from "./editProfile";
import { useNavigation } from "@react-navigation/native";

const Profile = ({ route }) => {
    const {username,avatar,fullname} = route.params.route;
    const params = route.params.route;
    const navigation = useNavigation();
    return (
        <View>
            <HeaderProfile username={fullname} urlImage={avatar} email={username} navigation={navigation}/>
            <View>
                <ButtonBody icon={require('../../img/history.png')} label="Lịch sử mua hàng" onPress={()=>{}}/>
                <ButtonBody icon={require('../../img/tag.png')} label="Voucher của bạn" onPress={()=>{}}/>
                <ButtonBody icon={require('../../img/person.png')} label="Thay đổi thông tin tài khoản" onPress={()=>{navigation.navigate('EditProfile',route={params});}}/>
                <ButtonBody icon={require('../../img/box.png')} label="Đơn hàng của bạn" onPress={()=>{}}/>
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor:'red',
                    width:300,
                    height:50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop:70
                }}

                onPress={()=>{
                    navigation.navigate('Login');
                }}
            >
                <Text style={{fontWeight:'bold',color:'white'}}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}
const HeaderProfile = ({ username, urlImage, email,navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Image style={styles.imageHeader} source={{uri:urlImage}} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{username}</Text>
                    <Text style={{ marginTop: 15 }}>{email}</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.goBack();
                    }}
                    style={styles.viewIcon}
                >
                    <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/previous.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const ButtonBody = ({ icon, label,onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={styles.viewButton}>
                <Image style={{ height: 30, width: 30, marginLeft: 40, marginRight: 20 }} source={icon} />
                <Text style={{ fontWeight: 'bold', marginRight: 30, color: 'grey' }} numberOfLines={2}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}
export default Profile;
const styles = StyleSheet.create({
    headerContainer: {
        height: 150,
        backgroundColor: '#5182CC',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: 'grey',
        shadowRadius: 20,
        justifyContent: 'center',

    },
    imageHeader: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 20
    },
    viewIcon: {
        height: 35,
        width: 35,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 100
    },
    viewButton: {
        backgroundColor: 'white',
        width: 300,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 10,
        shadowColor: 'grey',
        shadowRadius: 10,
        shadowOffset: { width: -5, height: 5 },
        alignItems: 'center',
        flexDirection: 'row',

    }

});