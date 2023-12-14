import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { formatPrice } from "../../utils/format";
import { setProductSelected } from "../../session";


const Variations = ({ variations, product_name, percent_discount }) => {


    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectVersionIndex, setSelectVersionIndex] = useState(0);
    const [selectedRAMROM, setSelectedRAMROM] = useState("");


    useEffect(() => {
        if (variations && variations.length > 0) {
            const selectedVersion = variations[selectVersionIndex];
            const dataIndex = variations[selectedColorIndex];
            dataIndex.product_name = product_name;
            dataIndex.percent_discount = percent_discount;
            setProductSelected(dataIndex)
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
                            style={styles.flatlist}
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
                style={styles.flatlist}
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
                <View style={[{ borderColor: select ? isSelected ? '#1E90FF' : 'grey' : '#E3E6E7', backgroundColor: select ? null : '#E3E6E7' }, styles.viewItem]}>
                    <Text style={{ color: select ? 'black' : 'grey' }}>{item.color}</Text>
                    <Text style={{ fontSize: 13, color: select ? 'red' : 'grey', fontWeight: '500' }}>{formatPrice(item.price * (1 - percent_discount / 100))}</Text>
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
            <View style={[{ borderColor: isSelected ? '#1E90FF' : '#E3E6E7', backgroundColor: isSelected ? null : '#E3E6E7' }, styles.viewItem]}>
                <Text>{item.ram}/{item.rom}</Text>
                <Text style={{ fontSize: 13, color: 'red', fontWeight: '500' }}>{formatPrice(item.price)}</Text>
            </View>
        </TouchableOpacity>

    );
}

export default Variations


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: "column",
        marginHorizontal: 8
    },
    viewItem: {
        height: 70,
        width: Dimensions.get("window").width * 0.25,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
    },
    flatlist: {
        flexGrow: 0,
        alignItems: 'center'
    }
});