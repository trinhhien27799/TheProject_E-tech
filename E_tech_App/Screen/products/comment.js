import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { getComments, checkComment, pushComment } from "../../CallApi/commentAPI"
import DropDownPicker from "react-native-dropdown-picker"
import { Rating, AirbnbRating } from 'react-native-ratings'
import * as ImagePicker from 'expo-image-picker'
import { getUser } from "../../session"
import LottieView from 'lottie-react-native'
import StartRating from '../../Component/startRating'

const Comment = ({ productId }) => {

    const [comments, setComments] = useState([])
    const [listVariation, setlistVariation] = useState([])
    const [variationId, setVariationId] = useState(null)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [images, setImages] = useState([])
    const [content, setContent] = useState('')
    const [allow, setAllow] = useState(false)
    const [numStar, setNumStar] = useState(5)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setAllow(content.toString().trim().length > 0 && variationId != null)
    }, [content, variationId])

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [14, 9],
            quality: 1,
            multiple: true,
        })

        if (!result.canceled) {
            setImages(prevImages => [...prevImages, ...result.assets])
        }
    }


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
        } catch (error) {
            console.log(`CommentScreen: ${error}`)
        }
    }

    useEffect(() => {
        getData()
        checkData()
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={{ uri: item.author.avatar }}
                    />
                    <Text style={{ marginStart: 5, fontWeight: '500' }}>{item.author.fullname}</Text>
                    <View style={{ flex: 1 }}></View>
                    <StartRating route={item.numStar} size={16} />
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#eeeeee', padding: 4, borderRadius: 10, alignItems: 'center' }}>
                    <Image
                        style={{ width: 40, height: 40, resizeMode: 'cover', marginTop: 4, borderRadius: 4 }}
                        source={{ uri: item.product.image }}
                    />
                    <View style={{ marginStart: 8 }}>
                        <Text>{item.product.name}</Text>
                        <Text style={{ fontSize: 13, overflow: "scroll", color: 'grey' }}>{item.product.property}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 4, fontSize: 13, marginBottom: 8 }}>{item.content}</Text>
                <FlatList
                    data={item.image}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Image
                            style={{ width: 155, aspectRatio: 14 / 9, resizeMode: 'cover', backgroundColor: '#eeeeee' }}
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


    const deleteImage = (pos) => {
        const updatedImages = images.slice().filter((_, index) => index !== pos)
        setImages(updatedImages)
    }
    const renderItemImage = ({ item, index }) => {
        return (
            <View style={{ position: 'relative' }}>
                <Image
                    style={{ width: 100, height: 180, resizeMode: 'contain' }}
                    source={{ uri: item.uri }}
                />
                <View
                    onTouchStart={() => {
                        deleteImage(index)
                    }}
                    style={{ width: 100, position: 'absolute', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.5)', paddingVertical: 16, alignItems: 'center' }}>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../../assets/bin.png')}
                    />
                </View>
            </View>
        )
    }

    const handleRating = (ratedValue) => {
        setNumStar(ratedValue)
      }

    const sendComment = async () => {
        try {
            setLoading(true)
            const form = new FormData()
            await Promise.all([
                new Promise((resolve) => {
                    images.forEach(async (asset, index) => {
                        const fileName = `${index}v${Date.now()}.jpg`
                        form.append('image', {
                            uri: asset.uri,
                            type: 'image/jpeg',
                            name: fileName,
                        })
                        resolve()
                    })
                }),
                new Promise((resolve) => {
                    form.append('userId', getUser()._id)
                    form.append('productId', productId)
                    form.append('variationId', variationId)
                    form.append('numStar', numStar)
                    form.append('content', content.toString().trim())
                    resolve()
                }),
            ])

            const response = await pushComment(form)
            if (response.code == 200) {
                console.log('Đánh giá thành công')
                const newListVariation = listVariation.filter((item) => item.variationId !== variationId)
                setlistVariation(newListVariation)
                setVariationId(null)
                getData()
            } else {
                console.log('Đánh giá thất bại')
            }
        } catch (error) {
            console.log(`Send Comment: ${error}`)
        } finally {
            setLoading(false)
        }
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
                        value={variationId}
                        items={listVariation}
                        setOpen={setOpen}
                        setValue={setVariationId}
                        setItems={setlistVariation}
                        hideSelectedItemIcon={true}
                        placeholder="Chọn loại sản phẩm"
                    />
                    <AirbnbRating
                        count={5}
                        reviewSize={18}
                        reviews={["Rất tệ", "Tệ", "Bình thường", "Hài lòng", "Rất hài lòng"]}
                        defaultRating={5}
                        size={18}
                        onFinishRating={handleRating}
                        ratingContainerStyle={{marginTop:8}}
                    />
                    <TextInput
                        placeholder="Cho chúng tôi biết cảm nhận của bạn về sản phẩm"
                        maxLength={200}
                        multiline
                        numberOfLines={4}
                        onChangeText={setContent}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity
                            onPress={pickImages}
                            style={{ backgroundColor: '#9b9b9b', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                        >
                            <Image
                                style={{ width: 15, height: 15 }}
                                source={require('../../assets/plus.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ marginStart: 10 }}>Thêm ảnh minh họa</Text>
                    </View>
                    <FlatList
                        horizontal
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItemImage}
                    />
                    {loading
                        ?
                        <>
                            <LottieView
                                autoPlay
                                style={{ width: 40, height: 40, marginTop: 10, position: 'absolute', right: 10, bottom: 10 }}
                                source={require('../../assets/logo.json')}
                            />
                        </>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                sendComment()
                            }}
                            disabled={!allow}
                            style={{ marginTop: 10 }}>
                            <Text style={{ color: allow ? 'blue' : 'grey', textAlign: 'right' }}>Gửi Đánh giá</Text>
                        </TouchableOpacity>
                    }


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
})
