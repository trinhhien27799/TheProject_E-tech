import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CounselScreen from "./counselScreen";
import Information from "./information";
import Voucher from "./voucher";
import { getUser } from "../../session";
import BoxChats from "../../Component/boxChats";
import SignAlert from "./signAlert";

const Question = ({chats,addChat})=>{
    const user = getUser();
    const title = {"title":"Bạn chưa đăng nhập tài khoản !!!","boolean":false}
   switch (chats.title) {
       case 'Tư vấn sản phẩm':
           return (
               <CounselScreen addChats={addChat}/>
           );
       case 'Thông tin đơn hàng':
           return (
            user == null ? 
            <View>
                <BoxChats route={title}/>
                <SignAlert visible={true} />
            </View> :
               <Information />
           );
       case 'Xem voucher':
           return (
            user == null ? 
        <View>
            <BoxChats route={title}/>
            <SignAlert visible={true} />
        </View> :
               <Voucher />
           );
       case 'Gặp tư vấn viên':
           return (
               <View>
               <Text>Gặp tư vấn viên</Text>
               </View>
           );
       default:
        return null;
   }
}
export default Question;
const styles = StyleSheet.create({

});