import React, { useRef, useState } from 'react'
import { Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import tailwind from 'twrnc'
import ProductComment from '../Component/ProductComment'
import BottomSheet from '@devvie/bottom-sheet'
import StarRatingModal from '../Component/CommentModal/StarRatingModal'
import ProductVariationModal from '../Component/CommentModal/ProductVariationModal'

const DetailCommentScreen = () => {
    const starOpenRef = useRef(null);
    const variationOpenRef = useRef(null);

    const [sortRatingStar, setSortRatingStar] = useState(null);

    const handleRatingStarValue = (returnedValue) => {
        setSortRatingStar(returnedValue);
    }

    console.log(sortRatingStar);

    return (
        <View style={tailwind `h-full`}>
            {/* Comment tab */}
            <View style={tailwind`bg-blue-200 py-5 flex-row justify-center`}>
                <TouchableOpacity style={tailwind`bg-green-200 w-20 h-20 justify-center rounded-lg`}>
                    <Text style={tailwind`self-center`}>Tất cả</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={tailwind`bg-green-200 w-20 h-20 justify-center mx-6 rounded-lg`}
                    onPress={() => starOpenRef.current.open()}
                >
                    <View style={tailwind`flex-row self-center`}>
                        <Text style={tailwind`mr-1`}>Số sao</Text>
                        <Image
                            style={tailwind`w-5 h-3 mt-1`}
                            source={require('../img/down_7356260.png')}
                        />
                    </View>

                    <Text style={tailwind`self-center`}>(Tất cả)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={tailwind`bg-green-200 w-20 h-20 justify-center rounded-lg px-2`}
                    onPress={() => variationOpenRef.current.open()}
                >
                    <View style={tailwind`flex-row self-center`}>
                        <Text style={tailwind`mr-1`}>Phân loại</Text>
                        <Image
                            style={tailwind`w-5 h-3 mt-1`}
                            source={require('../img/down_7356260.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Comment line */}
            <ProductComment starRating={sortRatingStar} productID={'65590e5cc77a4a005ce12f3b'}/>

            {/* Bottom modal */}
            <BottomSheet ref={starOpenRef}>
                <StarRatingModal onValueReturn={handleRatingStarValue}/>
            </BottomSheet>

            <BottomSheet ref={variationOpenRef}>
                <ProductVariationModal/>
            </BottomSheet>
        </View>
    )
}

export default DetailCommentScreen