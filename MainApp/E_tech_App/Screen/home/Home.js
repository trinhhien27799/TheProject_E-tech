import React from "react";
import { ScrollView, View } from "react-native";
import MainHeader from "./MainHeader";
import Banner from "./banner";
import ListProduct from "./listProduct";
import BestSeller from "./bestSeller";
import FavoriteScreen from "./FavoriteScreen";

const Home = ({navigation,route}) => {
    return (
        <View style={{flex:1,paddingTop:'5%'}}>
            <ScrollView>
                <MainHeader route={route.params} navigation={navigation} />
                <Banner />

                <ListProduct />
                <BestSeller title={"Best Seller"} />
                <FavoriteScreen />
            </ScrollView>
        </View>
    );
}
export default Home;