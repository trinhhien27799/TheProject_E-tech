import React from "react";
import { ScrollView, Text, View } from "react-native";
import MainHeader from "./MainHeader";
import data from '../../Model/items';
import Banner from "./banner";
import ListProduct from "./listProduct";
import BestSeller from "./bestSeller";
import tailwind from "twrnc";

const Home = ({ navigation }) => {
    return (
        <View style={tailwind`bg-gray-100 flex-1`}>
            <ScrollView>
                <View style={tailwind `bg-blue-400`}>
                    <MainHeader username={"Username"} navigation={navigation} />
                    <Banner list={data} />
                </View>
                <ListProduct />
                <BestSeller title={"Best Seller"} />
                <BestSeller title={"Sản phẩm yêu thích"} />
            </ScrollView>
        </View>
    );
}
export default Home;