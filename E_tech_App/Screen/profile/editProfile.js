import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import userModel from "../../Model/user";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";
import HeaderItem from "../../Component/headerItem";
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import { updateAvatar, updateFullname } from "../../CallApi/userApi";

const EditProfile = ({ navigation, route }) => {
    const userData = route.params.params;
    const [isPasswordShow, setisPasswordShow] = useState(false);
    const [image, setImage] = useState(userData.avatar);
    const [fullname,setFullname] = useState(userData.fullname);
    const saveProfile = async() => {
        const Avatar = await updateAvatar(image)
        const updateName = await updateFullname(fullname)
        if(Avatar.code == 200 && updateName.code == 200){
            navigation.goBack();
        }else if(Avatar.message){
            alert(Avatar.message)
        }else{
            alert(updateName.message)
        }
    }
    
    const imagePicker = async  () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
    }

    return (
        <View style={{ paddingTop: '5%' }}>
            <HeaderItem title={'Edit Profile'} />
            <TouchableOpacity
                onPress={()=>imagePicker()}
            >
                <Image style={styles.circleAvatar} source={{ uri: image }} resizeMode="cover" />

            </TouchableOpacity>
            <TextFields setFullname={setFullname} fullname={fullname} user={userData} isPasswordShow={isPasswordShow} setisPasswordShow={setisPasswordShow} />
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

const TextFields = ({fullname, user, isPasswordShow, setisPasswordShow,setFullname }) => {
    return (
        <View>
            <ItemProfile value={fullname} title={'Full name'} setFullname={setFullname}/>
            <ItemProfile value={user.username} title={'Email'} />
            <ItemProfile username={user.username} value={'mật khẩu là không có mật khẩu'} title={'Password'} isPasswordShow={isPasswordShow} setisPasswordShow={setisPasswordShow} />
        </View>
    );
}

const ItemProfile = ({setFullname, value, title, isPasswordShow, setisPasswordShow, username }) => {
    const navigation = useNavigation();
    return (
        <View style={{ margin: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            <View style={styles.viewInput}>
                <TextInput
                    style={styles.textField}
                    value={value}
                    secureTextEntry={title == 'Password'}
                    editable={title != 'Password'}
                    onChangeText={(text)=>setFullname(text)}
                />
                {title == 'Password' ? (
                    <TouchableOpacity
                        onPress={() => {
                            setisPasswordShow(!isPasswordShow);
                            navigation.navigate('ResetPassword', { username })

                        }}
                    >
                        <Ionicons size={15} name={"pencil-outline"} />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>

    )
}

export default EditProfile;
const styles = StyleSheet.create({

    circleAvatar: {
        height: 180,
        width: 180,
        borderRadius: 200,
        alignSelf: 'center',
        marginTop: 10
    },
    viewInput: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        marginTop: 5,
        padding: 10,
        borderColor: 'grey',
        alignItems: 'center'
    },
    textField: {
        flex: 1
    },
    button: {
        alignSelf: 'center',
        marginTop: 50,
        width: 200,
        backgroundColor: "#0099FF",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: "#0099FF",
    }
});