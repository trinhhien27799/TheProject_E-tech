import React from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { View, Text } from 'react-native'
import tailwind from 'twrnc'
import RatingStarComment from '../Component/RatingStar_Comment'
import { useNavigation } from '@react-navigation/native'

const AddCommentScreen = ({route}) => {
  const {product} = route.params;
  const navigation = useNavigation();

  console.log(product);

  return (
    <View>
      <TouchableOpacity 
        style={tailwind `w-12 h-12 bg-white m-5 justify-center rounded-full shadow-md`}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../img/previous.png')}
          style={tailwind `w-8 h-8 self-center`}/>
      </TouchableOpacity>

      {/* Product View */}
      <View style={tailwind `bg-blue-200 flex-row p-3`}>
        <Image 
          source={{uri: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQCmbymQ0MCn2pQIhiPQNhjVotdNoF46fdzjqwoBRKzHPlWHXKRhbpTHDp1ZlWpwn8aE5qFHszMQJSo5pWldhzGr5WCEDuu_d4ZbOiv8T_3P_2SKbooXG4n9w&usqp=CAE'}}
          style={tailwind `w-22 h-30`}
        />
        <View style={tailwind `ml-3`}>
          <Text style={tailwind `w-80 mb-2`}>{product.product_name}</Text>
          <Text>Loại: Product Variation</Text>
        </View>
      </View>

      {/* Rating Star Group */}
      <View style={tailwind `bg-yellow-200 p-3`}>
        <View style={tailwind `flex-row`}>
          <Text>Chất lượng sản phẩm: </Text>
          <RatingStarComment style={'ml-3 h-1'}/>
        </View>
      </View>

      {/* User Comment */}
      <View>
        <TextInput
          multiline={true}
          numberOfLines={1000}
          style={tailwind `border border-blue-200 w-96 self-center p-3 h-50 text-base mt-3`}
          placeholder='Sản phẩm này như thế nào?'
        />

        <View style={tailwind `flex-row bg-purple-200 p-3`}>
          <TouchableOpacity style={tailwind `bg-lime-200 w-20 h-20 justify-center p-3 mr-3 rounded-lg`}>
            <Text style={tailwind `self-center`}>Thêm Ảnh</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={tailwind `bg-green-200 w-20 h-20 justify-center p-3 rounded-lg`}>
            <Text>Thêm Video</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Comment button */}
      <TouchableOpacity style={tailwind `bg-violet-300 w-50 p-3 justify-center self-center mt-3 rounded-lg`}>
        <Text style={tailwind `self-center`}>Comment</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddCommentScreen