import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import bestSeller from '../../Model/seller';
import items from '../../Model/items';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from "../../CallApi/config";
const BestSeller = () => {
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
  
  const formatCash = (str) => {

    return str.split('').reverse().reduce((prev, next, index) => {
      if(str){
        return ((index % 3) ? next : (next + '.')) + prev
      }
        else{

        }
    })
  }
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
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 27 }}>
          Giảm 30%
        </Text>
      </View>
      
      <TouchableOpacity onPress={() => {navigation.navigate('ProductDetail')}}>
        <Image style={styles.img} source={{uri: item.image_preview}} />
        <View style={styles.infoView}>
            <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{item.product_name}</Text>
            <View>
            <Text style={{ marginTop: 5,color:'red' }}>{formatCash( item.max_price+"")} đ</Text>
            </View>
        </View>
        <TouchableOpacity onPress={() => handleIcon(index)} style={styles.viewIcon}>
            <Ionicons size={23} color='red' name={isClickArray[index] ? 'heart' : 'heart-outline'} />
          </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style = {styles.titleContainer}>
          <Image style={{width:25,height:25,marginRight:10}} source={require('../../img/highlight1.png')}/>
          <Text style={styles.textTitle}>Bán chạy nhất</Text>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate('ListPhone')}}>
          <Text style={{ fontWeight: '500', color: 'blue',marginRight:15 }}>More</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={product}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoView:{
    marginTop:5,
    width:"90%"
  },
  textTitle:{
    fontWeight: '700',
    fontSize: 17,
  },

  titleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginTop:30,
    marginLeft:15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    position:'relative',
    backgroundColor: 'white',
    width: 180,
    height: 250,
    borderRadius: 10,
    shadowColor: 'grey',
    shadowRadius: 10,
    alignItems: 'center',
    marginRight:10,
    marginTop:15,
    padding:5
  },
  saler: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 75,
    paddingTop:3,
    paddingBottom:3,
    backgroundColor: 'red',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius:10,
    zIndex: 2,
  },
  img: {
    height: 140,
    width: 140,
    zIndex: 1,
    marginTop: 25,
  },
  viewIcon: {
    position:'absolute',
    bottom:-35,
    right:-10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default BestSeller;
