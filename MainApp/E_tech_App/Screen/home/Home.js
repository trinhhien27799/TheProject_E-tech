import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MainHeader from "./MainHeader";
import data from '../../Model/items';
import Banner from "./banner";
import ListProduct from "./listProduct";
import BestSeller from "./bestSeller";
import { useRoute } from "@react-navigation/native";

const Home = ({navigation,route}) => {
    const useData = route.params.registrationData;
    // console.log(JSON.stringify(useData));
    return (
        <View style={{flex:1,paddingTop:'5%'}}>
            <ScrollView>
                <MainHeader route={route.params} navigation={navigation} />
                <Banner list={data} />
                <ListProduct />
                <BestSeller title={"Best Seller"} />
                <BestSeller title={"Sản phẩm yêu thích"} />
            </ScrollView>
        </View>
    );
}
export default Home;