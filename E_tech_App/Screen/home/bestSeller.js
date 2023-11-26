import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList,Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getAllProduct, getItemProduct } from "../../CallApi/productApi"
import tailwind from 'twrnc'
import { formatPrice } from '../../utils/format'
import StartRating from '../../Component/startRating'

const BestSeller = () => {
  const navigation = useNavigation()

  const [product, setProduct] = useState([])
  const [title, setTitle] = useState('')
  const [more, setMore] = useState('')

  const getData = async () => {
    try {
      const rs = await getAllProduct()
      if (rs != null && rs.length > 0) {
        setProduct(rs)
        setTitle("Danh sách sản phẩm")
        setMore("Xem thêm")
      }

    } catch (error) {
      console.log(`bestSeller: ${error}`)
    }
  }
  useEffect(() => {
    getData()
  }, [])


  const renderItem = ({ item, index }) => {
    const handleItem = async () => {

      navigation.navigate('DetailPoducts',{productId:item._id});
    }
    return (
      <View style={styles.body}>
        {item.percent_discount > 0
          ? (
            <View style={styles.saler}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
                Giảm {item.percent_discount}%
              </Text>
            </View>
          ) :
          null
        }


        <TouchableOpacity onPress={handleItem}>
          <Image style={tailwind`w-35 h-28 self-center mt-4`} source={{ uri: item.image_preview }} />
          <View style={{ flexDirection: 'row' }}>
            <View style={tailwind`mt-4 w-37`}>
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.product_name}</Text>
              <Text style={{ marginTop: 5, marginBottom: 5 }}>Giá: {formatPrice(item.min_price ? item.min_price : 0)}</Text>
              {item.vote == 0 ? <Text>Chưa có đánh giá</Text> : <StartRating route={item.vote} />}
            </View>

          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Image style={{width:25,height:25,marginRight:10}} source={require('../../img/newspaper.png')}/>
          <Text style={{ fontWeight: '700', fontSize: 18,lineHeight:25 }}>{title}</Text>
        </View>
        <TouchableOpacity onPress={() => { navigation.navigate('ListPhone') }}>
          <Text style={{ fontWeight: '400', color: 'blue' }}>{more}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listView}>
      <FlatList
        data={product}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.flatListContainer}
      />
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listView: {
    paddingHorizontal:10,
    alignItems:"center",
  },
  flatListContainer:{
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle:{
    flexDirection: 'row',
  },
  body: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width/2 - 16, 
    height: 270,
    borderRadius: 10,
    shadowColor: 'grey',
    shadowRadius: 7,
    alignItems: 'center',
    shadowOpacity:0.2,
    margin:6
  },
  saler: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 75,
    height: 35,
    backgroundColor: 'red',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 10,
    zIndex: 2,
  },
  img: {
    height: 100,
    width: 140,
    zIndex: 1,
    marginTop: 25,
  },
  viewIcon: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    height: 30,
    width: 30,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  
})

export default BestSeller
