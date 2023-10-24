import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Profile from "../profile/profileScreen";



const MainHeader = ({ username, navigation }) => {
    const urlImage = 'https://cdn.pixabay.com/photo/2023/10/02/14/00/egg-8289259_640.png';
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile', { username: username, urlImage: urlImage, navigation: navigation })}
            >
                <View style={styles.viewAvatar}>
                    <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={{ uri: urlImage }} />
                    <View>
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>{username}</Text>

                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.viewSearch}
                onPress={() => navigation.navigate('SearchScreen')}
            >
                <Ionicons style={{ lineHeight: 50 }} name="search" size={25} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5px',
        marginTop: 15
    },
    viewAvatar: {
        // height: 80,
        // width: 200,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        shadowColor: 'gray',
        flexDirection: 'row',
    },
    viewSearch: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 50,
        shadowRadius: 2,
        marginRight: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});
export default MainHeader;