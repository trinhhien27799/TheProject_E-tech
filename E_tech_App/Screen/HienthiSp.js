import React, { useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import colors from "../colors";
import ListItem from "./ListItem";
import data from './items';
import ListHangPhone from "./ListHangPhone";
import data2 from './itemHangPhone';

const HienthiSP = () => {

    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '7%', width: '100%' }}>
                <Text style={{ fontSize: 18 }}>
                    Loại sản phẩm</Text>
            </View>
            <View style={{ flex: 1, height: '30%' }}>
                <Text style={{ fontSize: 18, marginLeft: 20 }}>Các hãng điện thoại</Text>
                <ScrollView horizontal>
                    {data2.map((item, index) => (
                        <ListHangPhone key={index} item={item} />
                    ))}
                </ScrollView>
            </View>
            <View>
                <ScrollView>
                    {data.map((item, index) => (
                        <ListItem key={index} item={item} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
export default HienthiSP;
