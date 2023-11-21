import React, { useEffect, useState } from 'react'
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import ViewMoreText from 'react-native-view-more-text'
import tailwind from 'twrnc'
import { useNavigation, useRoute } from '@react-navigation/native'
import ProductComment from '../Component/ProductComment'
import { getItemProduct } from '../CallApi/productApi'
import { formatPrice } from '../utils/format'

const ProductDetail = () => {
  const route = useRoute()
  const productId = route.params.productId
  const [product, setProduct] = useState({})
  const [buyNow, setBuyNow] = useState(false)
  const [color, setColor] = useState('')
  const [ram, setRam] = useState('')
  const [rom, setRom] = useState('')
  const [colors, setColors] = useState([])
  const [rams, setRams] = useState([])
  const [roms, setRoms] = useState([])
  const [productSecleted, setProductSelected] = useState({})






  const getData = async (productId) => {
    try {
      const response = await getItemProduct(productId)
      console.log(response)
      setProduct(response)
      setColor(response.variations[0].color)
      const arr1 = []
      const arr2 = []
      const arr3 = []
      response.variations.forEach((item) => {
        if (item.color) if (arr1.indexOf(item.color) < 0) arr1.push(item.color)
        if (item.ram) if (response.variations[0].color == item.color) if (arr2.indexOf(item.ram) < 0) arr2.push(item.ram)
        if (item.rom) if (arr1[0] == item.color && arr2[0] == item.ram) if (arr3.indexOf(item.rom) < 0) arr3.push(item.rom)
      })
      setRam(arr2[0])
      setRom(arr3[0])
      setColors(arr1)
      setRams(arr2)
      setRoms(arr3)
      setProductSelected(response.variations[0])
    } catch (error) {
      console.log(`ProductDetail: ${error}`)
    }
  }


  const changeColor = (color) => {
    setColor(color)
    const arr2 = []
    const arr3 = []
    product.variations.forEach((item) => {
      if (item.ram) { if (item.color == color) { if (arr2.indexOf(item.ram) < 0) { arr2.push(item.ram) } } }
      if (item.rom) { if (item.color == color && arr2[0] == item.ram) { if (arr3.indexOf(item.rom) < 0) { arr3.push(item.rom) } } }
    })
    setRam(arr2[0])
    setRom(arr3[0])
    setRams(arr2)
    setRoms(arr3)
    const prd = product.variations.filter((item) => item.color === color && item.ram === arr2[0] && item.rom === arr3[0])[0]
    setProductSelected(prd)
    console.log(prd._id)
  }


  const changeRam = (ram) => {
    setRam(ram)
    const arr3 = []
    product.variations.forEach((item) => {
      if (item.rom) if (item.color == color && item.ram == ram) if (arr3.indexOf(item.rom) < 0) arr3.push(item.rom)
    })
    setRom(arr3[0])
    setRoms(arr3)
    const prd = product.variations.filter((item) => item.color == color && item.ram == ram && item.rom == arr3[0])[0]
    setProductSelected(prd)
    console.log(prd._id)
  }


  const changeRom = (rom) => {
    setRom(rom)
    const prd = product.variations.filter((item) => item.color == color && item.ram == ram && item.rom == rom)[0]
    setProductSelected(prd)
    console.log(prd._id)
  }



  useEffect(() => {
    getData(productId)
  }, [])


  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false)

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible)
  }


  const BottomSheetModal = ({ visible, onClose }) => {
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={handleOverlayClick}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: productSecleted.image }}
                />
                <View>
                  <FlatList
                    horizontal
                    data={colors}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={{ marginHorizontal: 30 }}
                        onPress={() => changeColor(item)}>
                        <Text style={{ color: item == color ? 'red' : 'black' }}>{item}</Text>
                      </TouchableOpacity>

                    )}
                  />
                  {rams.length > 0 && <FlatList

                    horizontal
                    data={rams}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{ marginHorizontal: 30 }}
                        onPress={() => changeRam(item)}>
                        <Text
                          style={{ color: item == ram ? 'red' : 'black' }}>
                          {item}</Text>
                      </TouchableOpacity>
                    )}
                  />}
                  {roms.length > 0 && <FlatList
                    horizontal
                    data={roms}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => changeRom(item)}
                        style={{ marginHorizontal: 30 }}>
                        <Text
                          style={{ color: item == rom ? 'red' : 'black' }}>
                          {item}</Text>
                      </TouchableOpacity>
                    )}
                  />}
                </View>
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <Image style={styles.image_preview} source={{ uri: product.image_preview }} />
        <View>
          <View style={styles.viewName}>
            {product.brand_logo && <Image style={styles.logo} source={{ uri: product.brand_logo }} />}
            {product.percent_discount > 0 && <Text style={{ color: 'red', fontSize: 20, fontWeight: '600' }}>-{product.percent_discount}%</Text>}
            <Text style={styles.name}>{product.product_name}</Text>
          </View>
          <View style={{ width: '100%', height: 0.5, backgroundColor: 'grey' }}></View>
          {/* <Text style={{ fontSize: 15 }}>Giá chỉ từ {formatPrice(product.min_price)} đến {formatPrice(product.max_price)}</Text> */}

        </View>
      </ScrollView>
      <View style={[styles.viewAction, { display: product._id != undefined ? 'block' : 'none' }]}>
        <TouchableOpacity
          style={[styles.box, { backgroundColor: 'green' }]}
          onPress={() => {
            setBuyNow(false)
            toggleBottomSheet()
          }}>
          <Text style={[styles.textAction, { color: 'white' }]}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { backgroundColor: 'red' }]}
          onPress={() => {
            setBuyNow(true)
            toggleBottomSheet()
          }}>
          <Text style={[styles.textAction, { color: 'black' }]}>Mua ngay</Text>
        </TouchableOpacity>
      </View>


      <BottomSheetModal visible={isBottomSheetVisible} onClose={toggleBottomSheet} />


    </SafeAreaView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute'
  },
  image_preview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    backgroundColor: 'grey'
  },
  viewName: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginStart: 10
  },
  logo: {
    width: 40,
    height: 40
  },
  viewAction: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    flexDirection: 'row'
  },
  box: {
    flex: 1,
    paddingVertical: 20
  },
  textAction: {
    fontSize: 18,
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
})
