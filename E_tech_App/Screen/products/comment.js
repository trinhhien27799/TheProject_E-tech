import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import StartRating from "../../Component/startRating";
import { getUser } from "../../session";
import { getComments, checkComment } from "../../CallApi/commentAPI";
import DropDownPicker from "react-native-dropdown-picker";


const Comment = ({ productId }) => {

    const [comments, setComments] = useState([])
    const [listVariation, setlistVariation] = useState([])
    const [selectedValue, setSelectedValue] = useState(null)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const user = getUser()

    const getData = async () => {
        try {
            const response = await getComments(productId)
            setComments(response)
            if (response.length > 0) {
                setTitle("Phản hồi từ người mua")
            }
        } catch (error) {
            console.log(`CommentScreen: ${error}`)
        }
    }

    const checkData = async () => {
        try {
            const response = await checkComment(productId)
            setlistVariation(response)
            if (response.length > 0) {
                setSelectedValue(response[0])
            }
        } catch (error) {
            console.log(`CommentScreen: ${error}`)
        }
    }

    useEffect(() => {
        getData()
        checkData()
    }, [])

    useEffect(() => {
        console.log(selectedValue)
    }, [selectedValue])


    const renderItem = ({ item }) => {
        return (
            <View style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={{ uri: item.author.avatar }}
                    />
                    <Text style={{ marginStart: 5, fontWeight: '500' }}>{item.author.fullname}</Text>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#eeeeee', padding: 4, borderRadius: 10, alignItems: 'center' }}>
                    <Image
                        style={{ width: 40, height: 40, resizeMode: 'cover', marginTop: 4, borderRadius: 4 }}
                        source={{ uri: item.product.image }}
                    />
                    <View style={{ marginStart: 8 }}>
                        <Text>{item.product.name}</Text>
                        <Text style={{ fontSize: 13, overflow: "scroll",color:'grey' }}>{item.product.property}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 4, fontSize: 13, marginBottom: 8 }}>{item.content}</Text>
                <FlatList
                    data={item.image}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={{ uri: item }}
                        />
                    )}
                />
                <View
                    style={{ width: '100%', height: 0.6, backgroundColor: 'grey', marginVertical: 10 }}
                ></View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {listVariation.length > 0 &&
                <View style={{ borderRadius: 10, backgroundColor: '#eeeeee', padding: 10 }}>
                    <DropDownPicker
                        schema={{
                            label: 'property',
                            value: 'variationId',
                            icon: (item) => <Image source={{ uri: item.image }} style={{ width: 20, height: 20, resizeMode: 'cover' }} />
                        }}
                        open={open}
                        value={selectedValue}
                        items={listVariation}
                        setOpen={setOpen}
                        setValue={setSelectedValue}
                        setItems={setlistVariation}
                        hideSelectedItemIcon={true}
                        placeholder="Chọn loại sản phẩm"
                    />
                    <TextInput
                        placeholder="Nhập bình luận của bạn"
                        maxLength={200}
                        multiline
                        numberOfLines={4}
                    />
                    <TouchableOpacity>
                        <Text style={{ color: 'blue', textAlign: 'right' }}>Gửi Đánh giá</Text>
                    </TouchableOpacity>
                </View>
            }
            <Text style={styles.header}>{title}</Text>
            <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>

    )
}

export default Comment

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8
    },
    header: {
        marginTop: 10, fontWeight: 'bold', fontSize: 15,
        marginBottom: 10
    },
});
