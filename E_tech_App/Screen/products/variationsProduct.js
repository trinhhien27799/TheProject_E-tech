import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { getBrandName } from "../../CallApi/productApi";
import IteamBrand from "../../Component/itemBrand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatPrice } from "../../utils/format";
export default VariationsProducts = ({ route }) => {
    const routes = route.dataItem;
    const [branData, setBrandData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getBrandName({ brand_name: route.route.brand_name });
            setBrandData(data);
        }
        fetchData();
    }, []);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectVersionIndex, setSelectVersionIndex] = useState(0);
    const [selectedRAMROM, setSelectedRAMROM] = useState("");
    useEffect(() => {
        if (routes.variations && routes.variations.length > 0) {
          const selectedVersion = routes.variations[selectVersionIndex];
          const dataIndex = routes.variations[selectedColorIndex];
          AsyncStorage.setItem('dataSelect',JSON.stringify(dataIndex));
          setSelectedRAMROM(`${selectedVersion.ram}/${selectedVersion.rom}`);
        }
      }, [selectVersionIndex,selectedColorIndex]);
      const checkRam = routes.variations.filter(variation => variation.ram);
    return (
        <View >
            {
                checkRam.length > 0 ?
                <>
                <TextView title={'Lựa chọn phiên bản'} />
            <FlatList
                data={routes.variations}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                    return <ItemViewVersion
                        routes={item}
                        isSelected={selectVersionIndex == index}
                        onPress={() => {
                            setSelectVersionIndex(index);  
                        }}
                    />
                }}
                numColumns={3}

            />
                </>:null
            }
            <TextView title={'Lựa chọn màu sắc'} />
            <FlatList
                data={routes.variations}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                    return <ItemView
                        routes={item}
                        isSelected={selectedColorIndex == index}
                        onPress={() => {
                            setSelectedColorIndex(index);
                        }}
                        selectedRAMROM={selectedRAMROM}
                    />
                }}
                numColumns={3}

            />
            <TextView title={'Chi tiết sản phẩm'} />
            <TextView title={'Sản phẩm tương tự'} />
            <FlatList
                data={branData}
                keyExtractor={item => item._id}
                horizontal
                renderItem={({ item }) => {
                    return <IteamBrand routes={item} />
                }}
                style={styles.container}
            />
        </View>
    );
    
}
const ItemView = ({ routes, isSelected, onPress,selectedRAMROM }) => {
    const select = selectedRAMROM == routes.ram+'/'+routes.rom; 

    
    return (
        <View>
            <TouchableOpacity
                disabled={!select}
                onPress={onPress}
            >
                <View style={[{ borderColor: select?isSelected ? '#1E90FF' : 'grey':'grey' ,backgroundColor:select?null:'#E3E6E7'}, styles.viewItem]}>
                    <Text>{routes.color}</Text>
                    <Text style={{ fontSize: 10, color: 'red', fontWeight: 'bold' }}>{formatPrice(routes.price)}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const TextView = ({ title }) => (
    <View>
        <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15 }}>{title}</Text>

    </View>
);
const ItemViewVersion = ({ routes, isSelected, onPress }) => {
   
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={[{ borderColor: isSelected ? '#1E90FF' : 'grey' }, styles.viewItem]}>
                <Text>{routes.ram}/{routes.rom}</Text>
                <Text style={{ fontSize: 10, color: 'red', fontWeight: 'bold' }}>{formatPrice(routes.price)}</Text>
            </View>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: "row"
    },
    viewItem: {
        height: 70,
        width: Dimensions.get("window").width * 0.25,
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 10,
        marginBottom: 10,
    }
});