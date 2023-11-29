import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { View, Text } from 'react-native'
import tailwind from 'twrnc'
import RatingStarComment from '../Component/RatingStar_Comment'
import { useNavigation } from '@react-navigation/native'
import { getVariationDetail } from '../CallApi/productApi'
import { addComment } from '../CallApi/commentAPI'
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native'
import { Button } from 'react-native'

const AddCommentScreen = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();

  console.log(product)
  const [variation, setVariation] = useState(null);
  const [starRatingCount, setStarRatingCount] = useState(1);
  const [commentContent, setCommentContent] = useState('');
  const [takeImage, setTakeImage] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [modalDisplay, setModalDisplay] = useState(false);

  const handlePicturePress = (picture) => {
    setSelectedPicture(picture);
    setModalDisplay(true);
  };

  const handleCloseModal = () => {
    setSelectedPicture(null);
    setModalDisplay(false);
  };

  const removePicture = (index) => {
    setTakeImage((prevPictures) => {
      const updatedPictures = prevPictures.filter((_, i) => i !== index);
      return updatedPictures;
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the photo library was denied.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      // Do something with the selected image
      setTakeImage([...takeImage, result.uri]);
    }
  };

  const handleValueChange = (value) => {
    // Do something with the value received from the child component
    setStarRatingCount(value);
    console.log(starRatingCount);
  };

  const getVariation = async (variationID) => {
    try {
      const data = await getVariationDetail(variationID);
      setVariation(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVariation(product.variations_id)
  }, []);

  console.log("variation: " + variation);
  console.log('comment: ' + commentContent);

  return (
    <View style={tailwind`bg-white h-full`}>
      <ScrollView style={tailwind`p-4`}>
        <View style={tailwind``}>
          <TouchableOpacity
            style={tailwind`w-12 h-12 bg-white m-5 justify-center rounded-full shadow-md`}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../img/previous.png')}
              style={tailwind`w-8 h-8 self-center`} />
          </TouchableOpacity>

          {/* Product View */}
          <View style={tailwind`flex-row p-3 border-b border-gray-300`}>
            <Image
              source={{ uri: product.image }}
              style={tailwind`w-22 h-30`}
            />
            <View style={tailwind`ml-3`}>
              <Text style={tailwind`w-80 mb-2 font-bold`}>{product.product_name}</Text>
              <Text>Loại: </Text>
            </View>
          </View>

          {/* Rating Star Group */}
          <View style={tailwind`p-3 border-b border-gray-300 mb-3`}>
            <View style={tailwind`flex-row`}>
              <Text>Chất lượng sản phẩm: </Text>
              <RatingStarComment onValueChange={handleValueChange} style={'ml-3 h-1'} />
            </View>
          </View>

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
              data={takeImage}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              style={tailwind`ml-3`}
              renderItem={({ item, index }) => {
                console.log(index);
                return (
                  <View>
                    <TouchableOpacity onPress={() => removePicture(index)} style={tailwind`justify-center border border-gray-300 w-8 h-8 rounded-full`}>
                      <Image source={require('../img/cancle.png')} style={tailwind`w-5 h-5 self-center`} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tailwind`mr-3 mb-3 border border-gray-300 mt-1`}
                      onPress={handlePicturePress(item)}
                    >
                      <Image source={{ uri: item }} style={tailwind `w-30 h-30`} />
                    </TouchableOpacity>
                  </View>
                )
              }}
            />

            <View style={tailwind`flex-row p-3`}>
              <TouchableOpacity
                style={tailwind`border border-blue-500 w-25 h-25 justify-center p-3 mr-3 rounded-lg`}
                onPress={() => pickImage()}
              >
                <Text style={tailwind`self-center mb-1`}>Thêm Ảnh</Text>
                <Image source={require('../img/image_1214793.png')} style={tailwind`w-8 h-8 self-center`} />
              </TouchableOpacity>
              {/* <TouchableOpacity style={tailwind `bg-green-200 w-20 h-20 justify-center p-3 rounded-lg`}>
            <Text>Thêm Video</Text>
          </TouchableOpacity> */}
            </View>
          </View>

          {/* Comment button */}
          <TouchableOpacity
            style={tailwind`bg-blue-500 w-50 p-3 justify-center self-center mt-3 rounded-lg shadow-md mb-10`}
            onPress={() => { addComment(variation, commentContent, starRatingCount) }}
          >
            <Text style={tailwind`self-center font-bold text-white`}>Đánh Giá</Text>
          </TouchableOpacity>
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