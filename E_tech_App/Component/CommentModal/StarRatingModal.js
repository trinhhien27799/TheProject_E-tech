import React, { useState } from 'react'
import { FlatList, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import RatingStar from '../RatingStar';
import tailwind from 'twrnc';
import { RadioButton } from 'react-native-paper';

const StarRatingModal = ({onValueReturn}) => {
    const ChooseStarValueArray = [
        {
            id: 1, 
            value: 5
        },
        {
            id: 2, 
            value: 4
        },
        {
            id: 3, 
            value: 3
        },
        {
            id: 4, 
            value: 2
        },
        {
            id: 5, 
            value: 1
        },
    ];

    const [selectedStar, setSelectedStar] = useState(5);

    const StarRatingCard = ({item}) => {
        return(
            <View style={tailwind `flex-row mb-3 py-2 border-b border-gray-300 w-96 self-center`}>
                <View style={tailwind `justify-center flex-row ml-3`}>
                    <RadioButton 
                        value={item.value}
                    />
                    <Text style={tailwind `mt-2`}>{item.value}</Text>
                    <RatingStar starNum={item.value} style={'h-1 ml-2 mt-1.8'} />
                </View>
            </View>
        )
    }

    const onHandleValue = () => {
        onValueReturn(selectedStar);
    }

    return (
        <ScrollView>
            <View style={tailwind`h-full`}>
                <RadioButton.Group
                    onValueChange={(value) => setSelectedStar(value)}
                    value={selectedStar}
                >
                    <FlatList
                        data={ChooseStarValueArray}
                        renderItem={StarRatingCard}
                        keyExtractor={(item) => item.id}
                    />
                </RadioButton.Group>     

                <View style={tailwind`flex-row justify-center mt-3`}>
                    <TouchableOpacity 
                        style={tailwind`w-45 bg-blue-200 py-3 px-5 justify-center mr-3 rounded-md`}
                        onPress={() => setSelectedStar(0)}
                    >
                        <Text style={tailwind `self-center`}>Bỏ chọn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={tailwind`w-45 bg-green-300 py-3 justify-center rounded-md`}
                        onPress={onHandleValue}
                    >
                        <Text style={tailwind `self-center`}>Đồng ý</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        
    )
}

export default StarRatingModal