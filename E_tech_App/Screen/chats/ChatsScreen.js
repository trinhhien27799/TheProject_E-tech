import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import BoxChats from "../../Component/boxChats";
import { cleanChats, getChats, getUser, setChat } from "../../session";
import OtherScreen from "./otherScreen";
import Question from "./question";
import ItemProduct from "../../Component/hooks/useItemProducts";
import LoadingWidget from "../../Component/loading";
import ItemFlatlist from "../../Component/itemFlatlist";
const ChatsScreen = () => {
    const user = getUser();
    const navigation = useNavigation();
    const route = { "title": `Xin chào ${user?.fullname || ""}, E-tech giúp gì được cho bạn ?`, "boolean": false }
    const [chats, setChats] = useState([]);
    const {isLoading,dataItem} = ItemProduct();
    const addChats = (title, boolean,type) => {
        setChats([...chats,{ title, boolean,type }]);
    }
    return (
        isLoading ? <LoadingWidget />:
        <View style={{paddingBottom:100}}>
            <HeaderItem navigation={navigation} />
            {
                <ScrollView >
                    <BoxChats route={route} />
                    <OtherScreen addChats={addChats} />
                    {
                        chats.map((chat, index) => {
                            let filterData;
                            if(chat.title == 'Điện thoại'){
                                 filterData = dataItem.filter((item)=>item.product_type == 'Điện thoại')
                            }else{
                                 filterData = dataItem.filter((item)=>item.product_type != 'Điện thoại')
                            }
                            return (
                                <View key={index}>
                                    <BoxChats key={`box-${index}`} route={chat} />
                                    {
                                        chat.type == 0 ? <Question key={`question-${index}`} chats={chat} addChat={addChats}/> : null
                                    }
                                    {
                                        chat.type == 1 ?
                                        <FlatList 
                                            style={{marginLeft: 10}}
                                            data={filterData}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item,index)=>item._id.toString()}
                                            renderItem={({item})=>{
                                                return <ItemFlatlist key={index} route={item}/>
                                            }}
                                        />
                                        :null
                                    }
                                </View>
                            );
                        })
                    }
                    
                </ScrollView>
            }
        </View>
    )
}

const HeaderItem = ({ navigation }) => (
    <View style={{ flexDirection: 'row', padding: '5%', alignItems: 'center', backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
                cleanChats();
            }}>
                <Image source={require('../../img/previous.png')} style={{ height: 20, width: 30 }} />
            </TouchableOpacity>
            <View style={{ borderWidth: 1, borderRadius: 100, borderColor: 'grey', marginLeft: 10 }}>
                <Image source={require('../../img/birds.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
            </View>
        </View>
        <Text style={{ marginLeft: '15%', fontWeight: 'bold', fontSize: 15 }}> Trung tâm hỗ trợ</Text>
    </View>

);
export default ChatsScreen;
const styles = StyleSheet.create({

});