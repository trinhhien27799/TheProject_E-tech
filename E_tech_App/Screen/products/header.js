import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";


const HeaderProduct = ({ variations }) => {
    const navigation = useNavigation()
    const [borderIndex, setBorderIndex] = useState(0)
    const [image, setImage] = useState(null)

    const RenderItem = ({ item, index }) => (
        <TouchableOpacity
            style={{ elevation: 10 }}
            onPress={() => {
                setImage(item.image)
                setBorderIndex(index)
            }}
        >
            <Image
                source={{ uri: item.image }}
                style={{
                    height: 100, width: 100, resizeMode: 'center',
                    backgroundColor: 'white', marginEnd: 10,
                }} />
        </TouchableOpacity>
    )

    useEffect(() => {
        setImage(variations[0].image)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.viewImage}>
                {image && <Image style={styles.imagePd} source={{ uri: image }} />}
            </View>

            <FlatList
                horizontal
                data={variations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={RenderItem}
                style={styles.flastlist}
            />

            <TouchableOpacity
                style={styles.viewPrevious}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Ionicons name="arrow-back" size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewImage: {
        height: Dimensions.get('window').height * 0.5,
        width: '100%'
    },
    imagePd: {
        flex: 1,
        resizeMode: 'contain',
        backgroundColor: 'white',
        marginHorizontal: 40
    },
    viewPrevious: {
        position: 'absolute',
        margin: 20,
        width: 40,
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flastlist: {
        paddingLeft: 8,
        paddingBottom: 10
    }
})