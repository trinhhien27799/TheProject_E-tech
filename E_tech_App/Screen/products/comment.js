import React, { useEffect, useState } from "react"
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { getComments, checkComment, pushComment } from "../../CallApi/commentAPI"
import DropDownPicker from "react-native-dropdown-picker"
import { Rating, AirbnbRating } from 'react-native-ratings'
import * as ImagePicker from 'expo-image-picker'
import { getUser } from "../../session"
import LottieView from 'lottie-react-native'
import StartRating from '../../Component/startRating'
import tailwind from "twrnc"
import { useNavigation } from "@react-navigation/native"
import { CountUserRatingStar } from "../../DataMathResolve/CountUserRatingStar"
import { PieChart } from "react-native-chart-kit"

const Comment = ({ productId, product }) => {

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

    const navigation = useNavigation();

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
            if (response) {
                setComments(response)
                if (response.length > 0) {
                    setTitle("Phản hồi từ người mua")
                }
            }
        } catch (error) {
            console.log(`CommentScreen: ${error}`)
        }
    }

    const checkData = async () => {
        try {
            const data = { productId: productId }
            const response = await checkComment(data)
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
            <View style={tailwind`bg-white mb-5 p-3 rounded-lg shadow-md`}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={{ uri: item.author.avatar }}
                    />
                    <Text style={{ marginStart: 5, fontWeight: '500' }}>{item.author.fullname}</Text>
                    <View style={{ flex: 1 }}></View>
                    <StartRating route={item.numStar} size={16} />
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#eeeeee', padding: 8, borderRadius: 10, alignItems: 'center', marginBottom: 10 }}>
                    <Image
                        style={{ width: 40, height: 40, resizeMode: 'cover', marginTop: 4, borderRadius: 4 }}
                        source={{ uri: item.product.image }}
                    />
                    <View style={{ marginStart: 8 }}>
                        <Text style={tailwind`w-70`}>{item.product.name}</Text>
                        <Text style={{ fontSize: 13, overflow: "scroll", color: 'grey', width: '70%' }}>{item.product.property}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 4, fontSize: 13, marginBottom: 8 }}>{item.content}</Text>
                <FlatList
                    data={item.image}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Image
                            style={{ width: 155, aspectRatio: 14 / 9, resizeMode: 'cover', backgroundColor: '#eeeeee', marginRight: 10, marginBottom: 10 }}
                            source={{ uri: item }}
                        />
                    )}
                />
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
                (async () => {
                    images.map(async (asset, index) => {
                        const fileName = `${index}v${Date.now()}.jpg`
                        form.append('image', {
                            uri: asset.uri,
                            type: 'image/jpeg',
                            name: fileName,
                        })
                    })
                })(),
                (() => {
                    form.append('productId', productId)
                    form.append('variationId', variationId)
                    form.append('numStar', numStar)
                    form.append('content', content.toString().trim())
                })(),
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

    const sortCount5Star = CountUserRatingStar(comments, 5);
    const sortCount4Star = CountUserRatingStar(comments, 4);
    const sortCount3Star = CountUserRatingStar(comments, 3);
    const sortCount2Star = CountUserRatingStar(comments, 2);
    const sortCount1Star = CountUserRatingStar(comments, 1);

    const data = [
        {
            name: "5 sao",
            population: sortCount5Star,
            color: "#22B14C",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "4 sao",
            population: sortCount4Star,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "3 sao",
            population: sortCount3Star,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "2 sao",
            population: sortCount2Star,
            color: "#FFF200",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "1 sao",
            population: sortCount1Star,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
    }

    return (
        <View style={styles.container}>
            {listVariation.length > 0 &&
                <View style={{ marginTop: 10, borderRadius: 10, backgroundColor: 'white', padding: 20, width: '85%', alignItems: 'center', alignSelf: 'center' }}>
                    <DropDownPicker
                        schema={{
                            label: 'property',
                            value: 'variationId'
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
                        ratingContainerStyle={{ marginTop: 8 }}
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
                                style={{ width: 40, height: 40 }}
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

            {/* Chart View */}
            {comments.length > 0
                ? <View>
                    <View style={tailwind`bg-white py-5 my-3 rounded-lg shadow-md`}>
                        <Text style={tailwind`ml-5 text-base font-bold`}>Thống kê bình luận</Text>

                        <PieChart
                            data={data}
                            width={350}
                            style={tailwind`self-center`}
                            height={180}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[12, 10]}
                        />
                    </View>

                    <View style={tailwind`flex-row`}>
                        <Text style={styles.header}>{title}</Text>

                        {/* List Comment Button */}
                        <TouchableOpacity
                            style={tailwind`justify-center ml-37`}
                            onPress={() => navigation.navigate('ListCommentScreen', { commentData: comments, product: product })}
                        >
                            <Text style={tailwind`text-blue-500`}>Xem Thêm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : <></>
            }

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
        width: Dimensions.get('screen').width,
        paddingHorizontal: 8,
    },
    header: {
        marginTop: 10, fontWeight: 'bold', fontSize: 15,
        marginBottom: 10
    },
})
