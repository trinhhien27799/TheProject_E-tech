import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'

const CommentCard = ({ item }) => {
    return (
        <View style={tailwind `bg-white mt-3 w-90 self-center p-3 shadow-lg rounded-lg`}>
            {/* Comment header: avatar, username, date */}
            <View style={tailwind `flex-row`}>
                <View style={tailwind `flex-row`}>
                    <Image 
                        source={{ uri: item.avatar }} 
                        style={tailwind `w-8 h-8 rounded-full`}
                    />
                    <Text style={tailwind `ml-2 mt-2 font-bold`}>{item.username}</Text>
                </View>

                <Text style={tailwind `ml-32 mt-1`}>{item.date}</Text>
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

const ProductComment = () => {
    const commentArray = [
        {
            id: 1,
            username: 'hello',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '2023-11-11 / 21:00',
            comment: 'Sheeeeeesssshhhh'
        },
        {
            id: 2,
            username: 'hola',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '2023-11-11 / 21:00',
            comment: 'Sheeeeeesssshhhh'
        },
    ]
    return (
        <View>
            <FlatList
                data={commentArray}
                renderItem={CommentCard}
            />
        </View>
    )
}

export default ProductComment