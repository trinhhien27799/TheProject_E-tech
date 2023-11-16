import React, {useEffect} from "react";
import { ScrollView, View } from "react-native";
import MainHeader from "./MainHeader";
import Banner from "./banner";
import ListProduct from "./listProduct";
import BestSeller from "./bestSeller";
import FavoriteScreen from "./FavoriteScreen";
import { LogBox } from 'react-native';
const Home = ({ navigation, route }) => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    return (
        <View>
            <ScrollView>
                    <MainHeader route={route.params} navigation={navigation} />
                    <Banner />
                    <ListProduct />
                    <BestSeller />
                    <FavoriteScreen />
            </ScrollView>
        </View>
    );
}
export default Home;