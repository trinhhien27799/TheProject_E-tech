import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import RatingStar from './RatingStar'
import { getAllComment, getComment } from '../Model/CommentModel'
import { BarChart } from 'react-native-chart-kit'
import { ScrollView } from 'react-native'
import { CountUserRatingStar } from '../DataMathResolve/CountUserRatingStar'

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

const ProductCommentFix_Plus = ({starRating, productID}) => {
    const commentData = getAllComment(productID);

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

    // Sort Count
    const sortCount5Star = CountUserRatingStar(commentData, 5);
    const sortCount4Star = CountUserRatingStar(commentData, 4);
    const sortCount3Star = CountUserRatingStar(commentData, 3);
    const sortCount2Star = CountUserRatingStar(commentData, 2);
    const sortCount1Star = CountUserRatingStar(commentData, 1);

    // Chart setting
    const data = {
        labels: ["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"],
        datasets: [
          {
            data: [sortCount5Star, sortCount4Star, sortCount3Star, sortCount2Star, sortCount1Star]
          }
        ]
      };

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
    };

    return (
        <ScrollView>
            <BarChart
                style={tailwind `w-full self-center`}
                data={data}
                height={300}
                width={400}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                withVerticalLabels={true}
            />

            <FlatList
                data={setData}
                renderItem={CommentCard}
            />
        </ScrollView>
    )
}

export default ProductCommentFix_Plus