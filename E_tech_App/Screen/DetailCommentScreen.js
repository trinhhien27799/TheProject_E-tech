import React, { useRef, useState } from 'react'
import { Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import tailwind from 'twrnc'
import ProductComment from '../Component/ProductComment'
import BottomSheet from '@devvie/bottom-sheet'
import StarRatingModal from '../Component/CommentModal/StarRatingModal'
import ProductVariationModal from '../Component/CommentModal/ProductVariationModal'
import ProductCommentFix from '../Component/ProductCommentFix'

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
            <View style={tailwind `bg-white`}>
                <View style={tailwind `flex-row mt-2`}>
                    <TouchableOpacity
                        style={tailwind`w-9 h-9 bg-white m-4 mt-8 justify-center rounded-full shadow-md`}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('../img/previous.png')}
                            style={tailwind`w-5 h-5 self-center`} />
                    </TouchableOpacity>

                    <Text style={tailwind `mt-8.5 text-base font-bold`}>Đánh giá sản phẩm</Text>
                </View>
                

                {/* Comment tab */}
                <View style={tailwind`mb-4 flex-row justify-center p-1 mb-3`}>
                    <TouchableOpacity
                        style={tailwind`bg-white border border-blue-300 w-20 h-20 justify-center rounded-lg shadow-md`}
                        onPress={() => setSortRatingStar(null)}
                    >
                        <Text style={tailwind`self-center text-base`}>Tất cả</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tailwind`bg-white border border-blue-300 w-20 h-20 justify-center rounded-lg shadow-md mx-6`}
                        onPress={() => starOpenRef.current.open()}
                    >
                        <View style={tailwind`flex-row self-center`}>
                            <Text style={tailwind`mr-1`}>Số sao</Text>
                            <Image
                                style={tailwind`w-5 h-3 mt-1`}
                                source={require('../img/down_7356260.png')}
                            />
                        </View>

                        <Text style={tailwind`self-center`}>
                            {sortRatingStar == null ? 'Tất cả' : sortRatingStar + ' sao'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tailwind`bg-white border border-blue-300 w-20 h-20 justify-center rounded-lg shadow-md px-2`}
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
            </View>

            

            {/* Comment line */}
            <ProductCommentFix starRating={sortRatingStar} productID={'655538dbd76441d85e24f0ef'}/>

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