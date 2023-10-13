import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import bestSeller from '../../Model/seller';
import items from '../../Model/items';
import { Ionicons } from '@expo/vector-icons';

const BestSeller = ({title}) => {
  const [isClickArray, setIsClickArray] = useState(Array(items.length).fill(false));

  const handleIcon = (index) => {
    const updatedIsClickArray = [...isClickArray];
    updatedIsClickArray[index] = !updatedIsClickArray[index];
    setIsClickArray(updatedIsClickArray);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.body}>
      <View style={styles.saler}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
          Giảm {bestSeller.find((saler)=>saler.id==item.id).sale}%
        </Text>
      </View>
      <View>
        <Image style={styles.img} source={item.url} />
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ marginTop: 5 }}>Giá: {item.price}</Text>
            <Text style={{ marginTop: 5 }}>Loại: {item.loai}</Text>
          </View>
          <TouchableOpacity onPress={() => handleIcon(index)} style={styles.viewIcon}>
            <Ionicons size={24} color='red' name={isClickArray[index] ? 'heart' : 'heart-outline'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontWeight: '500', color: 'blue' }}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
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
    width: 150,
    height: 220,
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
