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
                            <RatingStar starNum={item.numStar} style={'h-4 ml-25'}/>
                        </View>
                        <Text style={tailwind`ml-2 mt-1`}>{item.date}</Text>
                    </View>              
                </View>
            </View>

            {/* Comment line */}
            <View style={tailwind `py-3`}>
                <Text style={tailwind `justify-center text-base`}>{item.content}</Text>
            </View>

            {/* Comment button */}
            <View style={tailwind `flex-row py-2 justify-center border border-gray-400 rounded-lg`}>
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
            </View>
        </View>
    )
}

const ProductCommentFix = ({starRating, productID}) => {
    const commentData = getAllComment(productID);
    console.log(commentData)

    const StarRatingSort = (starNum) => {
        if(starNum != null){
            const StarRatingSortData = commentData.filter((item) => item.numStar == starNum);
            return StarRatingSortData;
        }
        
        else{
            return commentData;
        }
    }
    // abc
    var setData = StarRatingSort(starRating);

    return (
        <View>
            <FlatList
                data={setData}
                renderItem={CommentCard}
            />
        </View>
    )
}

export default ProductCommentFix