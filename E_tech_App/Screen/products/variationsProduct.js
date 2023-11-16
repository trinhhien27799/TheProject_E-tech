import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import colors from "../../Component/colors";
import { getBrandName } from "../../CallApi/productApi";
import IteamBrand from "../../Component/itemBrand";
export default VariationsProducts = ({ route }) => {
    const [branData,setBrandData] = useState([]);
    useEffect(()=>{
        const fetchData =async()=>{
            const data = await getBrandName({brand_name:route.brand_name})
            setBrandData(data);
        }
        fetchData();
    },[]);
    return (
        <View >
            <TextView title={'Lựa chọn phiên bản'} />
            <FlatList
                data={route.variations}
                keyExtractor={item => item._id}
                renderItem={ItemViewVersion}
                style={styles.container}
            />
            <TextView title={'Lựa chọn màu sắc'} />
            <FlatList
                data={route.variations}
                keyExtractor={item => item._id}
                renderItem={ItemView}
                style={styles.container}
            />
            <TextView title={'Chi tiết sản phẩm'} />
            <TextView title={'Sản phẩm tương tự'} />
            <FlatList
                data={branData}
                keyExtractor={item => item._id}
                horizontal
                renderItem={({item})=>{  
                    return <IteamBrand route={item}/>
                }}
                style={styles.container}
            />
        </View>
    );
}
const ItemView = (route) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return (
        <View style={[{}, styles.viewItem]}>
            <Text>{route.item.color}</Text>
            <Text style={{ fontSize: 15, color: 'red', fontWeight: 'bold' }}>{numberWithCommas(route.item.price)}</Text>
        </View>
    );
}
const TextView = ({ title }) => (
    <View>
        <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15 }}>{title}</Text>

    </View>
);
const ItemViewVersion = (route) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return (
        <View style={[{}, styles.viewItem]}>
            <Text>{route.item.ram}/{route.item.rom}</Text>
            <Text style={{ fontSize: 15, color: 'red', fontWeight: 'bold' }}>{numberWithCommas(route.item.price)}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: "row"
    },
    viewItem: {
        height: 70,
        width: Dimensions.get("window").width * 0.3,
        borderColor: colors.grey,
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 20
    }
});