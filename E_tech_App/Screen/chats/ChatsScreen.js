import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import BotChats from "./BotChats";

const ChatsScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <HeaderItem navigation={navigation} />
            <ScrollView>
                <BotChats />
            </ScrollView>
        </View>
    )
}

const HeaderItem = ({ navigation }) => (
    <View style={{ flexDirection: 'row', padding: '5%', alignItems: 'center', backgroundColor: 'white' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../img/previous.png')} style={{ height: 20, width: 30 }} />
        </TouchableOpacity>
        <View style={{ borderWidth: 1, borderRadius: 100, borderColor: 'grey', marginLeft: 10 }}>
            <Image source={require('../../img/birds.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
        </View>
    </View>
    <Text style={{marginLeft:'15%',fontWeight:'bold',fontSize:15}}> Birds Biết Tuốt</Text>
</View>

);
export default ChatsScreen;
const styles = StyleSheet.create({

});