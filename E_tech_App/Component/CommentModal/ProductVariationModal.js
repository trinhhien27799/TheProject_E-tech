import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import { getItemProduct } from '../../CallApi/productApi'

const ProductVariationModal = ({ product, onValueReturn }) => {
    const [variationSelected, setVariationSelected] = useState(null);
    const [value, setValue] = useState(null);

    const onHandleValue = () => {
        onValueReturn(value);
    }

    const VariationCard = ({ item }) => {
        return (
            <TouchableOpacity 
                style={
                    variationSelected == item._id
                    ? tailwind `w-30 mb-2 mr-2 p-2 bg-slate-200 border-2 border-blue-400 rounded-lg`
                    : tailwind `w-30 mb-2 mr-2 p-2 bg-slate-200 border-2 border-slate-400 rounded-lg`
                }
                onPress={() => {
                    setVariationSelected(item._id);
                    setValue(item);
                }
                }
            >
                <Text style={tailwind`font-bold`}>
                    {item.color}
                </Text>
                <Text>
                    {item.ram}/{item.rom}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View>
                {/* Product Info */}
                <View style={tailwind `flex-row p-3 w-95 self-center border-b border-gray-300`}>
                    <Image
                        source={{ uri: product.image_preview }}
                        style={tailwind`w-25 h-35`}
                    />
                    <View style={tailwind `h-20 ml-3`}>
                        <Text style={tailwind`pt-14 h-full text-base font-bold`}>{product.product_name}</Text>
                        <Text>Hãng: {product.brand_name}</Text>
                    </View>              
                </View>

                {/* Product Variation Choose */}
                <ScrollView style={tailwind`w-94 self-center my-3`}>
                    {/* Variation color */}
                    <View>
                        <Text style={tailwind `mb-2 text-base font-bold`}>Các biến thể sản phẩm</Text>

                        <FlatList
                            data={product.variations}
                            style={tailwind `py-2`}
                            renderItem={VariationCard}
                            numColumns={3}
                        />
                    </View>
                </ScrollView>

                {/* Button */}
                <View style={tailwind`flex-row justify-center mb-5`}>
                    <TouchableOpacity 
                        style={tailwind`w-45 border border-blue-200 py-3 px-5 justify-center mr-3 rounded-md`}
                        onPress={() => setVariationSelected(null)}
                    >
                        <Text style={tailwind`self-center`}>Bỏ chọn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={tailwind`w-45 bg-blue-500 py-3 justify-center rounded-md`}
                        onPress={() => onHandleValue(value)}
                    >
                        <Text style={tailwind`self-center text-white`}>Đồng ý</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
}

export default ProductVariationModal