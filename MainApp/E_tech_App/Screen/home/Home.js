import React from "react";
import { ScrollView, Text, View } from "react-native";
import MainHeader from "./MainHeader";
import data from '../../Model/items';
import Banner from "./banner";
import ListProduct from "./listProduct";
import BestSeller from "./bestSeller";
import tailwind from "twrnc";
const Home = () => {
    return (
        <View style={tailwind `flex-1 bg-neutral-300`}>
            <ScrollView>
                <View style={tailwind `bg-sky-500`}>
                    <MainHeader username={"Username"} />
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