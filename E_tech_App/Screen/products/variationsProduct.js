import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatPrice } from "../../utils/format";


const VariationsProducts = ({ variations }) => {


    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectVersionIndex, setSelectVersionIndex] = useState(0);
    const [selectedRAMROM, setSelectedRAMROM] = useState("");


    useEffect(() => {
        if (variations && variations.length > 0) {
            const selectedVersion = variations[selectVersionIndex];
            const dataIndex = variations[selectedColorIndex];
            AsyncStorage.setItem('dataSelect', JSON.stringify(dataIndex));
            setSelectedRAMROM(`${selectedVersion.ram}/${selectedVersion.rom}`);
        }
    }, [selectVersionIndex, selectedColorIndex]);
    const checkRam = variations.filter(item => item.ram);
    return (
        <View style={styles.container}>
            {
                checkRam.length > 0 ?
                    <>
                        <TextView title={'Lựa chọn phiên bản'} />
                        <FlatList
                            data={variations}
                            keyExtractor={item => item._id}
                            renderItem={({ item, index }) => {
                                return <ItemViewVersion
                                    item={item}
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
            <TextView title={'Lựa chọn màu sắc'} />
            <FlatList
                data={variations}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                    return <ItemView
                        item={item}
                        isSelected={selectedColorIndex == index}
                        onPress={() => {
                            setSelectedColorIndex(index);
                        }}
                        selectedRAMROM={selectedRAMROM}
                    />
                }}
                numColumns={3}

            />
        </View>
    );
}
const ItemView = ({ item, isSelected, onPress, selectedRAMROM }) => {
    const select = selectedRAMROM == item.ram + '/' + item.rom;



    return (
        <View>
            <TouchableOpacity
                disabled={!select}
                onPress={onPress}
            >
                <View style={[{ borderColor: select ? isSelected ? '#1E90FF' : 'grey' : 'grey', backgroundColor: select ? null : '#E3E6E7' }, styles.viewItem]}>
                    <Text style={{color: select ? 'black' : 'grey'}}>{item.color}</Text>
                    <Text style={{ fontSize: 10, color: select ? 'red' : 'grey', fontWeight: 'bold' }}>{formatPrice(item.price)}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const TextView = ({ title }) => (
    <View>
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 15 }}>{title}</Text>
    </View>
);

const ItemViewVersion = ({ item, isSelected, onPress }) => {


    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={[{ borderColor: isSelected ? '#1E90FF' : 'grey' }, styles.viewItem]}>
                <Text>{item.ram}/{item.rom}</Text>
                <Text style={{ fontSize: 10, color: 'red', fontWeight: 'bold' }}>{formatPrice(item.price)}</Text>
            </View>
        </TouchableOpacity>

    );
}

export default VariationsProducts


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: "column",
        marginHorizontal:8
    },
    viewItem: {
        height: 70,
        width: Dimensions.get("window").width * 0.25,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginEnd: 10,
        marginBottom: 10,
    }
});