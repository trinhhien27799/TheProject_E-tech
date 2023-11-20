import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tailwind from "twrnc";
import color from "../../colors";

const Profile = ({ route }) => {
    console.log(route);

    const {username,avatar,fullname} = route.params;
    const params = route.params.route;
    const navigation = useNavigation();
    return (
        <View>
            <HeaderProfile username={fullname} urlImage={avatar} email={username} navigation={navigation}/>
            <View>
                <ButtonBody icon={require('../../img/history.png')} label="Lịch sử mua hàng" onPress={()=>{}}/>
                <ButtonBody icon={require('../../img/tag.png')} label="Voucher của bạn" onPress={()=>{navigation.navigate('MyVoucher')}}/>
                <ButtonBody icon={require('../../img/person.png')} label="Thay đổi thông tin tài khoản" onPress={()=>{navigation.navigate('EditProfile',route={params});}}/>
                <ButtonBody icon={require('../../img/box.png')} label="Đơn hàng của bạn" onPress={()=>{navigation.navigate('OrderScreen')}}/>
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
            {/* <View style={tailwind `flex-row w-90 self-center`}>
                <Image style={styles.imageHeader} source={{uri:urlImage}} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>{username}</Text>
                    <Text style={{ marginTop: 15, color: 'white' }}>{email}</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.goBack();
                    }}
                    style={styles.viewIcon}
                >
                    <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/previous.png')} />
                </TouchableOpacity>
            </View> */}
            <TouchableOpacity
                    onPress={()=>{
                        navigation.goBack();
                    }}
                    style={styles.viewIcon}
                >
                    <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/previous.png')} />
                </TouchableOpacity>
            <View style={styles.viewAvatar}>
                <Image style={styles.imageHeader} source={{uri:urlImage}} />
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
        height: Dimensions.get("window").height*0.2,
        backgroundColor: '#5182CC',
        shadowColor: 'grey',
        shadowRadius: 20,
        justifyContent: 'center',
        marginBottom:50,
    },
    imageHeader: {
        // width: 70,
        // height: 70,
        flex:1,
        // borderRadius: 10,
        // marginRight: 20
        resizeMode:'cover'
    },
    viewIcon: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#D0D3D4',
        justifyContent: 'center',
        marginLeft: 10,
        position:'relative',
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

    },
    viewAvatar:{
        height:125,
        width:125,
        borderRadius:100,
        backgroundColor:color.conHang,
        position:'absolute',
        flex:1,
        top:'60%',
        alignSelf:'center'
    }
});