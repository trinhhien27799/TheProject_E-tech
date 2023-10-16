import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React,{useState} from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import userModel from "../../Model/user";


const EditProfile = ({ navigation }) => {
    const [isPasswordShow,setisPasswordShow] = useState(false);
    const checkUserName = (username) => {
        return userModel.find((user) => user.username == username)
    }
    const saveProfile =()=>{
        return navigation.goBack();
    }

    const user = checkUserName("duong");
    return (
        <View>
            <HeaderEdit title={'Edit Profile'} navigation={navigation} />
                    <CircleAvatar url={user.avatar} />
            
            <TextFields user={user} isPasswordShow={isPasswordShow} setisPasswordShow={setisPasswordShow}/>
            <TouchableOpacity
                style={styles.button}
                onPress={saveProfile}
            >
                <Text>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const HeaderEdit = ({ title, navigation }) => {
    return (
        <View style={{ padding: 20 }}>
            <View style={styles.viewHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ flex: 1 }}
                >
                    <Image style={{ height: 30, width: 30 }} source={require('../../img/previous.png')} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>{title}</Text>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
    );
};
const CircleAvatar = ({ url }) => {
    return (
        <View>
            <Image  style={styles.circleAvatar} source={{ uri: url }} resizeMode="cover" />
        </View>
    );
}
const TextFields = ({ user,isPasswordShow,setisPasswordShow }) => {
    return (
        <View>
            <ItemProfile value={user.fullname} title={'Full name'}/>
            <ItemProfile value={user.email} title={'Email'}/>
            <ItemProfile value={user.password} title={'Password'} isPasswordShow={isPasswordShow} setisPasswordShow={setisPasswordShow}/>
        </View>
    );
}
const ItemProfile = ({ value, title,isPasswordShow, setisPasswordShow}) => {
    return (
        <View style={{ margin: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            <View style={styles.viewInput}>
                <TextInput
                    style={styles.textField}
                    value={value}
                    secureTextEntry={title === 'Password' && !isPasswordShow}
                />
                {title == 'Password'?(
                <TouchableOpacity
                    onPress={() => setisPasswordShow(!isPasswordShow)}
                >
                    <Ionicons size={15} name={isPasswordShow ? "eye-off" : "eye"} />
                </TouchableOpacity>
                ):null}
            </View>
        </View>
    )
}


export default EditProfile;
const styles = StyleSheet.create({
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textHeader: {
        flex: -1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    circleAvatar: {
        height: 180,
        width: 180,
        borderRadius: 200,
        alignSelf: 'center',
        marginTop: 10
    },
    viewInput:{
        flexDirection:'row',
        height: 50,
        borderWidth: 1,
        marginTop: 5,
        padding: 10,
        borderColor: 'grey',
        alignItems:'center'
    },
    textField: {
        flex:1
    },
    button:{
        alignSelf: 'center',
        marginTop:50,
        width:200,
        backgroundColor:"#0099FF",
        height:50,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:10,    
        shadowRadius:10,
        shadowColor:  "#0099FF",  
    }
});