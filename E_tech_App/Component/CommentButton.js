import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import tailwind from 'twrnc'
import { getVariationModal } from '../Model/Variation'

const CommentButton = ({item}) => {
  const navigation = useNavigation();
  const variation = getVariationModal(item.variations_id);
  console.log(variation);

  return (
    <View style={tailwind`border border-blue-300 flex-row my-3 p-3 w-88 self-center rounded-md`}>
      <Text style={tailwind`w-50`}>Đánh giá sẽ có liệu lực sử dụng trong vòng 10 ngày</Text>

      <TouchableOpacity 
        style={tailwind`ml-12 bg-blue-500 justify-center p-2 rounded-md`}
        onPress={() => navigation.navigate('AddCommentScreen', {product: variation})}
      >
        <Text style={tailwind `font-bold text-white`}>Đánh Giá</Text>
      </TouchableOpacity>

    </View>
  ) 
}

export default CommentButton