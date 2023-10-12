import React from "react";
import { ScrollView, Text, View } from "react-native";
import MainHeader from "./MainHeader";
import data from '../../Model/items';
import Banner from "./banner";
import ListProduct from "./listProduct";
import BestSeller from "./bestSeller";
const Home = () => {
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <MainHeader username={"Username"} />
            <Banner list={data} />
            <ListProduct/>
            <BestSeller title={"Best Seller"}/>
            <BestSeller title={"Sản phẩm yêu thích"}/>

        </View>
    );
}
export default Home;