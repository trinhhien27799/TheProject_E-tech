import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { View, Text } from 'react-native'
import tailwind from 'twrnc'
import RatingStarComment from '../Component/RatingStar_Comment'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getVariationDetail } from '../CallApi/productApi'
import { addComment, pushComment } from '../CallApi/commentAPI'
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native'
import { Button } from 'react-native'
import { getVariationModal } from '../Model/Variation'
import { getUser } from '../session'

const AddCommentScreen = () => {
  const route = useRoute();
  const { product } = route.params;
  const navigation = useNavigation();

  const [starRatingCount, setStarRatingCount] = useState(1);
  const [commentContent, setCommentContent] = useState('');
  const [images, setImages] = useState([])
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [listVariation, setlistVariation] = useState([]);
  const [variationId, setVariationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const productId = product.productId;

  const handlePicturePress = (picture) => {
    setSelectedPicture(picture);
    setModalDisplay(true);
  };

  const handleCloseModal = () => {
    setSelectedPicture(null);
    setModalDisplay(false);
  };
  const deleteImage = (pos) => {
    const updatedImages = images.slice().filter((_, index) => index !== pos)
    setImages(updatedImages)
  }

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [14, 9],
      quality: 1,
      multiple: true,
    })

    if (!result.canceled) {
      setImages(prevImages => [...prevImages, ...result.assets])
    }
  }


  const handleValueChange = (value) => {
    // Do something with the value received from the child component
    setStarRatingCount(value);
    console.log(starRatingCount);
  };


  const sendComment = async () => {
    console.log("ok")
    try {
      const form = new FormData()
      await Promise.all(
        images.map(async (asset, index) => {
          const fileName = `${index}v${Date.now()}.jpg`
          form.append('image', {
            uri: asset.uri,
            type: 'image/jpeg',
            name: fileName,
          })
        })
      )
      form.append('productId', product.productId)
      form.append('variationId', product._id)
      form.append('numStar', starRatingCount)
      form.append('content', commentContent.toString().trim())
      console.log("form")
      const response = await pushComment(form)
      if (response.code == 200) {
        console.log('Đánh giá thành công')
      } else {
        console.log('Đánh giá thất bại')
      }
    } catch (error) {
      console.log(`Send Comment: ${error}`)
    } finally {
      navigation.goBack()
    }
  }


  return (
    <View style={tailwind`h-full`}>
      <ScrollView>
        <View style={tailwind``}>
          <View style={tailwind`bg-white p-3`}>
            <View style={tailwind`flex-row`}>
              <TouchableOpacity
                style={tailwind`w-9 h-9 bg-white m-5 justify-center rounded-full shadow-md`}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={require('../img/previous.png')}
                  style={tailwind`w-5 h-5 self-center`} />
              </TouchableOpacity>

              <Text style={tailwind`text-base font-bold mt-5.5`}>Tạo đánh giá</Text>
            </View>

            {/* Product View */}
            <View style={tailwind`flex-row p-3`}>
              <Image
                source={{ uri: product.image }}
                style={tailwind`w-22 h-30`}
              />
              <View style={tailwind`ml-3`}>
                <Text style={tailwind`w-70 mb-2 font-bold`}>{product.productName}</Text>
                <Text>Loại: {product.color}</Text>
              </View>
            </View>

            {/* Rating Star Group */}
            <View style={tailwind`p-3 border-t border-gray-300`}>
              <View style={tailwind`flex-row self-center`}>
                <Text>Chất lượng sản phẩm: </Text>
                <RatingStarComment onValueChange={handleValueChange} style={'ml-3 h-1'} />
              </View>
            </View>
          </View>

          <View style={tailwind`bg-white mt-5`}>
            {/* User Comment */}
            <View>
              <TextInput
                multiline={true}
                numberOfLines={1000}
                style={tailwind`border border-blue-200 w-90 self-center p-3 h-50 text-base my-3 rounded-lg`}
                placeholder='Sản phẩm này như thế nào?'
                onChangeText={(text) => setCommentContent(text)}
              />

              <FlatList
                data={images}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                style={tailwind`ml-3`}
                renderItem={({ item, index }) => {
                  console.log(index);
                  return (
                    <View>
                      <TouchableOpacity onPress={() => deleteImage(index)} style={tailwind`justify-center border border-gray-300 w-8 h-8 rounded-full`}>
                        <Image source={require('../img/cancle.png')} style={tailwind`w-5 h-5 self-center`} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={tailwind`mr-3 mb-3 border border-gray-300 mt-1`}
                        onPress={handlePicturePress(item.uri)}
                      >
                        <Image source={{ uri: item.uri }} style={tailwind`w-30 h-30`} />
                      </TouchableOpacity>
                    </View>
                  )
                }}
              />

              <View style={tailwind`flex-row p-3`}>
                <TouchableOpacity
                  style={tailwind`border border-blue-500 w-25 h-25 justify-center p-3 mr-3 rounded-lg`}
                  onPress={pickImages}
                >
                  <Text style={tailwind`self-center mb-1`}>Thêm Ảnh</Text>
                  <Image source={require('../img/image_1214793.png')} style={tailwind`w-8 h-8 self-center`} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Comment button */}
            <TouchableOpacity
              style={tailwind`bg-blue-500 w-50 p-3 justify-center self-center mt-3 rounded-lg shadow-md mb-10`}
              onPress={() => {
                sendComment()
              }}
            >
              <Text style={tailwind`self-center font-bold text-white`}>Đánh Giá</Text>
            </TouchableOpacity>
          </View>
        </View>

        {modalDisplay
          ? <></>
          : <Modal visible={modalDisplay} animationType="slide">
            <View style={tailwind`justify-center items-center`}>
              <Image
                source={{ uri: selectedPicture }}
                style={tailwind`w-full h-68`}
              />
              <Button title="Close" onPress={handleCloseModal} />
            </View>
          </Modal>
        }
      </ScrollView>
    </View>
  )
}

export default AddCommentScreen