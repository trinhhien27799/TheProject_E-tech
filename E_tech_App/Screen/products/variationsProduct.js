import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { getBrandName } from "../../CallApi/productApi";
import IteamBrand from "../../Component/itemBrand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatPrice } from "../../utils/format";
import LottieView from 'lottie-react-native';
export default VariationsProducts = ({ route, setDataTest }) => {
    const [branData, setBrandData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getBrandName({ brand_id: route.brand_id });
                setBrandData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }

        }
        fetchData();
    }, []);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectVersionIndex, setSelectVersionIndex] = useState(0);
    const [selectedRAMROM, setSelectedRAMROM] = useState("");
    useEffect(() => {
        if (route.variations && route.variations.length > 0) {
            const selectedVersion = route.variations[selectVersionIndex];
            const dataIndex = route.variations[selectedColorIndex];
            AsyncStorage.setItem('dataSelect', JSON.stringify(dataIndex));
            setSelectedRAMROM(`${selectedVersion.ram}/${selectedVersion.rom}`);
        }else{
            const dataIndex = route;
            AsyncStorage.setItem('dataSelect', JSON.stringify(dataIndex)); 
        }
    }, [selectVersionIndex, selectedColorIndex]);
    const checkRam = route.variations.filter(variation => variation.ram);
    const filteredBranData = branData.filter(item => item._id !== route._id);
    return (
        <View >
            {
                checkRam.length > 0 ?
                    <>
                        <TextView title={'Lựa chọn phiên bản'} />
                        <FlatList
                            data={route.variations}
                            keyExtractor={item => item._id}
                            renderItem={({ item, index }) => {
                                return <ItemViewVersion
                                    route={item}
                                    isSelected={selectVersionIndex == index}
                                    onPress={() => {
                                        setSelectVersionIndex(index);
                                    }}
                                />
                            }}
                            numColumns={3}

                        />
                    </> : null
            }
            {
                route.variations.length > 0 ?
                    <>
                        <TextView title={'Lựa chọn màu sắc'} />
                        <FlatList
                            data={route.variations}
                            keyExtractor={item => item._id}
                            renderItem={({ item, index }) => {
                                return <ItemView
                                    route={item}
                                    isSelected={selectedColorIndex == index}
                                    onPress={() => {
                                        setSelectedColorIndex(index);
                                        setDataTest(item)
                                    }}
                                    selectedRAMROM={selectedRAMROM}
                                />
                            }}
                            numColumns={3}

                        />
                    </> : null
            }
            <TextView title={'Chi tiết sản phẩm'} />
            {
                filteredBranData.length > 0 ?
                    <>
                        <TextView title={'Sản phẩm tương tự'} />
                        <LottieView
                            autoPlay
                            style={[styles.loading, { display: isLoading ? 'block' : 'none' }]}
                            source={require('../../assets/logo.json')}
                        />
                        <FlatList
                            data={filteredBranData}
                            keyExtractor={item => item._id}
                            horizontal
                            renderItem={({ item }) => {
                                return <IteamBrand route={item} />
                            }}
                            style={styles.container}
                        />
                    </> : null
            }

        </View>
    );
}
const ItemView = ({ route, isSelected, onPress, selectedRAMROM }) => {
    const select = selectedRAMROM == route.ram + '/' + route.rom;


    return (
        <View>
            <TouchableOpacity
                disabled={!select}
                onPress={onPress}
            >
                <View style={[{ borderColor: select ? isSelected ? '#1E90FF' : 'grey' : 'grey', backgroundColor: select ? null : '#E3E6E7' }, styles.viewItem]}>
                    <Text>{route.color}</Text>
                    <Text style={{ fontSize: 10, color: 'red', fontWeight: 'bold' }}>{formatPrice(route.price)}</Text>
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
const ItemViewVersion = ({ route, isSelected, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={[{ borderColor: isSelected ? '#1E90FF' : 'grey' }, styles.viewItem]}>
                <Text>{route.ram}/{route.rom}</Text>
                <Text style={{ fontSize: 10, color: 'red', fontWeight: 'bold' }}>{formatPrice(route.price)}</Text>
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