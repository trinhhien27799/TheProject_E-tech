import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tailwind from "twrnc";
import color from "../../colors";
import { Ionicons } from "@expo/vector-icons";
import OrderSreen from "./orderSreen";
import { getMyVoucher } from "../../CallApi/voucherApi";
import { getLike } from "../../CallApi/productApi";
import IteamProduct from "../../Component/itemProducts";

const Profile = ({ route }) => {
    const { username, avatar, fullname} = route.params;
    const params = route.params;
    const navigation = useNavigation();
    const [likeData, setLikeData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyVoucher();
            const like = await getLike();
            setLikeData(like); 
        }
        fetchData();
    }, [])
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderProfile urlBackround={avatar} username={fullname} urlImage={avatar} email={username} navigation={navigation} />
            <View>
                <TouchableOpacity style={styles.viewEdit}
                    onPress={() => { navigation.navigate('EditProfile', route = { params }) }}
                >

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Edit Profile</Text>
                </TouchableOpacity>
                <View>
                    <View style={{ marginLeft: '10%', marginTop: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ height: 20, width: 20, marginRight: '10%', tintColor: 'black' }} source={require('../../img/notes.png')} />
                            <Text>Đơn mua</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={{ flexDirection: 'row' }}
                        >
                            <Text>Lịch sử mua hàng</Text>
                            <Image style={{ height: 10, width: 10, marginLeft: 5, alignSelf: "center", marginRight: '10%', tintColor: 'black' }} source={require('../../img/next.png')} />
                        </TouchableOpacity>
                    </View>
                    
                    <OrderSreen />
                </View>
                <ButtonBody icon={require('../../img/tag.png')} label="Voucher của tôi" onPress={() => { navigation.navigate('MyVoucher') }} />
                <View style={{ flexDirection: "row", marginLeft: "7%", alignItems: 'center', marginTop: '10%' }}>
                    <Image style={{ height: 25, width: 25, alignSelf: "center", marginRight: 5 }} source={require('../../img/shopping.png')} />
                    <Text>Mua lại</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row", marginLeft: "7%", alignItems: 'center', marginTop: '10%' }}>
                        <Image style={{ height: 25, width: 25, alignSelf: "center", marginRight: 5 }} source={require('../../img/heart.png')} />
                        <Text>Đã thích</Text>
                    </View>
                    <FlatList
                        data={likeData}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return <IteamProduct key={item._id} route={item} />
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
const HeaderProfile = ({ username, urlImage, email, navigation,urlBackround }) => {
    return (
        <ImageBackground source={{ uri: urlBackround }} style={[{ backgroundColor: 'transparent' }, styles.headerContainer]}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={styles.viewIcon}
            >
                <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/previous.png')} />
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                flex: 1,
                top: '70%',
                left: Dimensions.get("window").height * .14
            }}>
                <View style={styles.viewAvatar}>
                    <Image style={styles.imageHeader} source={{ uri: urlImage }} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', textAlign: 'center' }}>{username}</Text>
                    <Text style={{ marginTop: 15, color: 'black', textAlign: 'center' }}>{email}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SettingScreen');
                }}
                style={styles.viewIcon}
            >
                <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: 'white' }} source={require('../../img/setting.png')} />
            </TouchableOpacity>
        </ImageBackground>
    );
}
const ButtonBody = ({ icon, label, onPress }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={styles.viewButton}>
                    <Image style={{ height: 20, width: 20, marginLeft: 30, marginRight: 10 }} source={icon} />
                    <Text style={{ fontWeight: 'bold', marginRight: 30, color: 'grey' }} numberOfLines={2}>{label}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default Profile;
const styles = StyleSheet.create({
    headerContainer: {
        height: Dimensions.get("window").height * 0.3,
        shadowColor: 'grey',
        shadowRadius: 20,
        marginBottom: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    imageHeader: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius:100,
    },
    viewIcon: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        margin: '5%',
        position: 'relative',
    },
    viewButton: {
        alignSelf: 'center',
        marginTop: '10%',
        alignItems: 'center',
        flexDirection: 'row',

    },
    viewEdit: {
        backgroundColor: '#3D405B',
        width: 150,
        height: 50,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 10,
        shadowColor: 'grey',
        shadowRadius: 10,
        shadowOffset: { width: -5, height: 5 },
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    viewAvatar: {
        height: 125,
        width: 125,
        borderRadius: 100,
        backgroundColor: color.conHang,
        alignSelf: 'center'
    }
});