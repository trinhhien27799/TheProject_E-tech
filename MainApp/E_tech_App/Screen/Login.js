import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {  Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const Login= ()=>{
    const [isPasswordShow,setisPasswordShow] = useState(false);
    const [isChecked,setIsChecker]=useState(false);
    
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style ={styles.view}>
                <View style={{marginVertical: 22}}>
                    <Text style={{fontSize:22,fontWeight:'bold',marginVertical:12,color:'black'}}>
                        Đăng nhập
                    </Text>
                    <Text style={{color:'gray'}}>
                        Vui lòng nhập username và mật khẩu của bạn
                    </Text>
                </View>
                <View style={{marginBottom: 12}}>
                    <Text style={styles.textInput}>
                        Username
                    </Text>
                    <View style={styles.viewInput}>
                        <TextInput
                            placeholder="Enter your Username"
                            placeholderTextColor={'black'}
                            style={{width:'100%'}}
                        />
                    </View>
                </View>
                <View style={{marginBottom: 12}}>
                    <Text style={styles.textInput}>
                        Password
                    </Text>
                    <View style={styles.viewInput}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={'black'}
                            secureTextEntry={isPasswordShow}
                            style={{width:'100%'}}
                        />
                        <TouchableOpacity
                        onPress={()=>setisPasswordShow(!isPasswordShow)}
                        style={{
                            position: 'absolute',
                            right:12,
                        }}
                        
                        >
                            {
                                isPasswordShow == true ?(
                                    <Ionicons name="eye-off" size={24} color={'black'}/>
                                ):(
                                <Ionicons name="eye" size={24} color={'black'}/>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginVertical:6,flexDirection:'row'}}>
                    <Checkbox 
                        style={{marginRight:8}}
                        value= {isChecked}
                        onValueChange={setIsChecker}
                        color={isChecked ? 'black':undefined}
                    />
                    <Text>Lưu tài khoản</Text>                   
                </View>
                <TouchableOpacity
                        style={styles.button}
                >
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Login</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"center",
                    marginVertical:22,
            
                }}>
                    <Text >Bạn chưa có tài khoản ?</Text>
                    <Pressable onPress={null}>
                        <Text style={{
                            fontSize:16,
                            color:'red',
                            fontWeight:'bold',
                            marginLeft:6
                        }}>
                            Sign up
                        </Text>
                    </Pressable>
                </View>
            
            </View>

        </SafeAreaView>
        
    )

}
export default Login;
const styles = StyleSheet.create({
    safeArea:{
        flex:1,
        backgroundColor: 'white',
        padding:10
    },
    view:{
        flex:1,
        marginHorizontal:22
    },
    viewInput:{
        width:'100%',
        height:48,
        borderColor:'black',
        borderWidth:1,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:22        
    },
    textInput:{
        fontSize:16,
        fontWeight:400,
        marginVertical:8
    },
    button:{
        backgroundColor:'#affaf0',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        padding:10,
        width:"50%",
        marginTop:18,
    }
});