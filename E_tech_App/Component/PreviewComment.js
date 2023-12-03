import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import ProductCommentFix from './ProductCommentFix'
import { useNavigation } from '@react-navigation/native'
import ProductCommentFix_Plus from './ProductCommentFix_Plus'

const PreviewComment = ({id}) => {
    const demoId = '655538dbd76441d85e24f0ef'
    const navigation = useNavigation();
    return (
        <View style={tailwind``}>
            <View style={tailwind`px-2 flex-row`}>
                <Text style={tailwind `text-base font-bold m-3`}>Bình luận</Text>
                <TouchableOpacity 
                    style={tailwind `m-3 self-end ml-48`}
                    onPress={() => navigation.navigate('ListCommentScreen', {productID: demoId})}
                >
                    <Text style={tailwind `text-base font-bold text-blue-500`}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            <ProductCommentFix productID={demoId} starRating={null}/>
        </View>
    )
}

export default PreviewComment