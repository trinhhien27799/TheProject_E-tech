import React, { useState } from "react";
import { Image, Text, View,StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import colors from "./colors";
import ListItem from "./ListItem";
import data from './items';

const ListPhone = () => {
    return (
        <ScrollView>
            {data.map((item, index) => (
                <ListItem key={index} item={item} />
            ))}
        </ScrollView>
    );
}
export default ListPhone;

