import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import RatingStar from './RatingStar'
import { getAllComment, getComment } from '../Model/CommentModel'

const CommentCard = ({ item }) => {
    return (
        <View style={tailwind `bg-white mt-3 w-90 self-center p-3 shadow-lg rounded-lg`}>
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
                        <Text style={tailwind`ml-2 mt-1`}>{item.date}</Text>
                    </View>              
                </View>
            </View>

            {/* Comment line */}
            <View style={tailwind `py-3`}>
                <Text style={tailwind `justify-center text-base`}>{item.content}</Text>
            </View>

            {/* Comment button */}
            <View style={tailwind `flex-row py-2 justify-center`}>
                <TouchableOpacity>
                    <Image 
                        source={require('../img/positive_1972459.png')}
                        style={tailwind `w-5 h-5`}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('../img/more_512222.png')}
                        style={tailwind`w-5 h-5 ml-74`}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ProductComment = ({starRating, productID}) => {
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

export default ProductComment