import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import MainHeader from "./MainHeader";
import Banner from "./banner";
import ListProduct from "./listProduct";
import BestSeller from "./bestSeller";
import FavoriteScreen from "./FavoriteScreen";
import ListBrand from "./listBrand";

const Home = ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="red" />
            <MainHeader route={route.params} navigation={navigation} />
            <ScrollView>
                <Banner />
                <ListProduct />
                <ListBrand />
                <BestSeller />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: { flex: 1 }
})
export default Home;