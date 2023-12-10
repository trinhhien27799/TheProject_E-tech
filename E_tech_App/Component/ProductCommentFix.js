import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import RatingStar from './RatingStar'
import { getAllComment, getComment } from '../Model/CommentModel'

const CommentCard = ({ item }) => {
    return (
        <View style={tailwind `bg-white mt-3 self-center p-3 w-full`}>
            {/* Comment header: avatar, username, date */}
            <View style={tailwind `flex-row`}>
                <View style={tailwind `flex-row`}>
                    <Image 
                        source={{ uri: item.author.avatar }} 
                        style={tailwind `mt-3 w-10 h-10 rounded-full`}
                    />
                    <View>
                        <View style={tailwind `flex-row`}>
                            <Text style={tailwind`ml-2 mt-2 font-bold`}>{item.author.fullname}</Text>
                            <RatingStar starNum={item.numStar} style={'h-4 ml-14'}/>
                        </View>
                        <Text style={tailwind`ml-2 mt-1 w-65`}>{item.product.property}</Text>
                    </View>              
                </View>
            </View>

            {/* Comment line */}
            <View style={tailwind `py-3`}>
                <Text style={tailwind `justify-center text-base`}>{item.content}</Text>
            </View>

            <View style={tailwind `mb-3`}>
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

            {/* Comment button */}
            {/* <View style={tailwind `flex-row py-2 justify-center border border-gray-400 rounded-lg`}>
                <TouchableOpacity style={tailwind `border-r p-3 w-50 border-gray-400`}>
                    <View style={tailwind `flex-row self-center`}>
                        <Image
                            source={require('../img/positive_1972459.png')}
                            style={tailwind`w-5 h-5 mr-3`}
                        />

                        <Text>Thích</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={tailwind `p-3 w-50`}>
                    <View style={tailwind `self-center flex-row`}>
                        <Image
                            source={require('../img/more_512222.png')}
                            style={tailwind`w-5 h-5 mr-3`}
                        />

                        <Text>Phản Hồi</Text>
                    </View>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

const ProductCommentFix = ({starRating, commentData, variationSort}) => {
    const currentData = commentData;

    const StarRatingSort = (starNum, variationSort) => {
        if(starNum != null){
            const StarRatingSortData = currentData.filter((item) => item.numStar == starNum);
            return StarRatingSortData;
        }

        else if(variationSort != null){
            const variationStructure = `Màu sắc: ${variationSort.color}, bộ nhớ ngoài: ${variationSort.ram}, bộ nhớ trong: ${variationSort.rom}`;
            const variationSortData = currentData.filter((item) => item.property == variationStructure);
            return variationSortData;
        }
        
        else{
            return currentData;
        }
    }
    // abc
    var setData = StarRatingSort(starRating, variationSort);

    return (
        <View>
            {
                setData.length == 0
                ? <View style={tailwind `flex-1 h-170 justify-center`}>
                    <Image 
                        source={require('../img/thinking_2161947.png')}
                        style={tailwind `w-50 h-50 self-center`}
                    />
                    <Text style={tailwind `text-base font-bold self-center mt-5`}>Oooooopppppsssss, chưa có comment</Text>
                </View>
                : <FlatList
                data={setData}
                renderItem={CommentCard}
            />
            }      
        </View>
    )
}

export default ProductCommentFix