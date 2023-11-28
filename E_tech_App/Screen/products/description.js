import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Description = ({ description }) => {
    const [data, setData] = useState([])
    const [more, setMore] = useState('')
    const [hide, setHide] = useState(true)
    const [noDescrition, setNoDescription] = useState('')

    useEffect(() => {
        if (!description || description.length == 0) {
            setNoDescription("Không có mô tả của sản phẩm này.")
        }
    }, [])

    useEffect(() => {
        if (hide) {
            if (description.length > 6) {
                setMore("Xem thêm")
                const newArray = description.slice(0, 4)
                setData(newArray)
            } else {
                setData(description)
            }
        } else {
            setMore("Ẩn bớt")
            setData(description)
        }
    }, [hide])

    const renderItem = ({ item }) => {
        return (
            <View>
                {item.title && <Text style={styles.title}>{item.title}</Text>}
                {item.description && <Text style={styles.description}>{item.description}</Text>}
                {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mô tả sản phẩm</Text>
            <Text>{noDescrition}</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <TouchableOpacity
                onPress={() => { setHide(!hide) }}
            >
                <Text style={styles.more}>{more}</Text>
            </TouchableOpacity>
        </View>

    )
}

export default Description
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8
    },
    header: {
        marginTop: 10, fontWeight: 'bold', fontSize: 15,
        marginBottom: 4
    },
    title: {
        marginTop: 10, fontWeight: '500',
        marginBottom: 8
    },
    description: {
        marginBottom: 8
    },
    image: {
        width: Dimensions.get('screen').width-16,
        aspectRatio:16/9,
        marginBottom: 12,
        resizeMode: 'cover'
    },
    more: {
        color: 'blue'
    }

});
