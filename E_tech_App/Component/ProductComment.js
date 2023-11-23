import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import RatingStar from './RatingStar'

const CommentCard = ({ item }) => {
    return (
        <View style={tailwind `bg-white mt-3 w-90 self-center p-3 shadow-lg rounded-lg`}>
            {/* Comment header: avatar, username, date */}
            <View style={tailwind `flex-row`}>
                <View style={tailwind `flex-row`}>
                    <Image 
                        source={{ uri: item.avatar }} 
                        style={tailwind `mt-3 w-10 h-10 rounded-full`}
                    />
                    <View>
                        <View style={tailwind `flex-row`}>
                            <Text style={tailwind`ml-2 mt-2 font-bold`}>{item.username}</Text>
                            <RatingStar starNum={item.starNum} style={'h-4 ml-37'}/>
                        </View>
                        <Text style={tailwind`ml-2 mt-1`}>{item.date}</Text>
                    </View>              
                </View>
            </View>

            {/* Comment line */}
            <View style={tailwind `py-3`}>
                <Text style={tailwind `justify-center text-base`}>{item.comment}</Text>
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

const ProductComment = ({starRating}) => {
    const commentArray = [
        {
            id: 1,
            username: 'hello',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '2023-11-11 / 21:00',
            comment: 'Sheeeeeesssshhhh',
            starNum: 3
        },
        {
            id: 2,
            username: 'hola',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '2023-11-11 / 21:00',
            comment: 'Sheeeeeesssshhhh',
            starNum: 5
        },
    ];

    const StarRatingSort = (starNum) => {
        if(starNum != null){
            const StarRatingSortData = commentArray.filter((item) => item.starNum == starNum);
            return StarRatingSortData;
        }
        
        else{
            return commentArray;
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