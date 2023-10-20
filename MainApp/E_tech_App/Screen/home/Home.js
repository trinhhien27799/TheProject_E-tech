import React from "react";
import { ScrollView, Text, View } from "react-native";
import MainHeader from "./MainHeader";
import data from '../../Model/items';
import Banner from "./banner";
import ListProduct from "./listProduct";
import BestSeller from "./bestSeller";
const Home = ({navigation}) => {
    return (
        <View style={tailwind `flex-1 bg-neutral-300`}>
            <ScrollView>
                <MainHeader username={"Username"} navigation={navigation} />
                <Banner list={data} />
                <ListProduct />
                <BestSeller title={"Best Seller"} />
                <BestSeller title={"Sản phẩm yêu thích"} />
                
            </ScrollView>
        </View>
    );
}
export default Home;