import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllProduct } from "../../CallApi/productApi";
import tailwind from 'twrnc';
import { formatPrice } from '../../utils/format'

const BestSeller = () => {
  const navigation = useNavigation();

  const [product, setProduct] = useState([]);

  const getData = async () => {
    try {
      const rs = await getAllProduct()
      setProduct(rs)
    } catch (error) {
      console.log(`bestSeller: ${error}`)
    }
  }
  useEffect(() => {
    getData()
  }, []);


  const renderItem = ({ item, index }) => (
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


      <TouchableOpacity onPress={() => { navigation.navigate('ProductDetail', { product: item }) }}>
        <Image style={tailwind`w-25 h-30 self-center mt-4`} source={{ uri: item.image_preview }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={tailwind`mt-4 w-37`}>
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.product_name}</Text>
            <Text style={{ marginTop: 5 }}>Giá: {formatPrice(item.min_price ? item.min_price : 0)}</Text>
            <Text style={{ marginTop: 5 }}>Hãng: {item.brand_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Danh sách sản phẩm</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('ListPhone') }}>
          <Text style={{ fontWeight: '500', color: 'blue' }}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={product}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  body: {
    backgroundColor: 'white',
    margin: 10,
    width: 180,
    height: 270,
    borderRadius: 20,
    shadowColor: 'grey',
    shadowRadius: 10,
    alignItems: 'center',
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
});

export default BestSeller;
