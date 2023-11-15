import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import bestSeller from '../../Model/seller';
import items from '../../Model/items';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from "../../CallApi/config";
import tailwind from 'twrnc';
const BestSeller = ({title}) => {
  const [isClickArray, setIsClickArray] = useState(Array(items.length).fill(false));
  const navigation = useNavigation();
  
  // Fetch API products
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/product/get-all`).then((res) => {
      setProduct(res.data);
    })
  }, []);

  const handleIcon = (index) => {
    const updatedIsClickArray = [...isClickArray];
    updatedIsClickArray[index] = !updatedIsClickArray[index];
    setIsClickArray(updatedIsClickArray);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.body}>
      {/* 
      ==> Code này đang bị lỗi đối chiếu với id của model giảm giá

      <View style={styles.saler}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
          Giảm {bestSeller.find((saler)=>saler.id==item.id).sale}%
        </Text>
      </View> 
      */}

    {/* Code lắp tạm thay thế */}
      <View style={styles.saler}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
          Giảm 30%
        </Text>
      </View>
      
      <TouchableOpacity onPress={() => {navigation.navigate('ProductDetail', {product: item})}}>
        <Image style={tailwind `w-25 h-30 self-center mt-4`} source={{uri: item.image_preview}} />
        <View style={{ flexDirection: 'row' }}>
          <View style={tailwind `mt-4 w-37`}>
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.product_name}</Text>
            <Text style={{ marginTop: 5 }}>Giá: {item.max_price}</Text>
            <Text style={{ marginTop: 5 }}>Loại: {item.brand_name}</Text>
          </View>
          <TouchableOpacity onPress={() => handleIcon(index)} style={styles.viewIcon}>
            <Ionicons size={24} color='red' name={isClickArray[index] ? 'heart' : 'heart-outline'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('ListPhone')}}>
          <Text style={{ fontWeight: '500', color: 'blue' }}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={product}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
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
    borderTopLeftRadius:10,
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
