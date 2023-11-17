import React from "react"
import { SafeAreaView, ScrollView, SectionList, StatusBar, StyleSheet, View } from "react-native"
import MainHeader from "./MainHeader"
import Banner from "./banner"
import ListProduct from "./listProduct"
import BestSeller from "./bestSeller"
import FavoriteScreen from "./FavoriteScreen"
import ListBrand from "./listBrand"

const Home = ({ navigation, route }) => {
    const data = [
        { type: 0 },
        { type: 1 },
        { type: 2 },
        { type: 3 }
    ]
    const sections = [{ data, key: 'section' }]

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 0:
                return <Banner />
            case 1:
                return <ListProduct />
            case 2:
                return <ListBrand />
            case 3:
                return <BestSeller />
            default:
                return null
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="red" />
            <MainHeader route={route.params} navigation={navigation} />
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: { flex: 1 }
})
export default Home