import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'

const ProductVariationModal = () => {
  return (
    <View>
        {/* Product Info */}
        <View style={tailwind `flex-row bg-lime-300 px-5`}>
            <Image 
                source={{uri: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSjvZzLeYi7veO0GeQCIX57zPvEaIN-frs-nS4hpCdRZ1cs6Or_hGya1TjNkkwzt5prxVXxcFQW5_c5ht62XHANAGi0JxPO6z_8fDT9S7IM4jaJznI85bavsA&usqp=CAE'}}
                style={tailwind `w-25 h-35`}
            />
            <Text style={tailwind `pt-14 ml-5 h-full`}>Product Name</Text>
        </View>

        {/* Product Variation Choose */}
        <ScrollView style={tailwind `bg-purple-200 w-94 self-center my-3`}> 
            {/* Variation color */}
            <View>
                <Text>Màu sắc</Text>
            </View>

            {/* Variation ram storage */}
            <View>
                <Text>Bộ nhớ trong</Text>
            </View>
        </ScrollView>

        {/* Button */}
          <View style={tailwind`flex-row justify-center`}>
              <TouchableOpacity style={tailwind`w-45 bg-blue-200 py-3 px-5 justify-center mr-3 rounded-md`}>
                  <Text style={tailwind`self-center`}>Bỏ chọn</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tailwind`w-45 bg-green-300 py-3 justify-center rounded-md`}>
                  <Text style={tailwind`self-center`}>Đồng ý</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}

export default ProductVariationModal