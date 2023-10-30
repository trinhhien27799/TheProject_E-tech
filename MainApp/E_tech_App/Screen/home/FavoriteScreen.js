import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import favorites from '../../Model/favorites';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const FavoriteScreen = () => {
  const [isClickArray, setIsClickArray] = useState(Array(favorites.length).fill(false));
  
  const handleIcon = (index) => {
    const updatedIsClickArray = [...isClickArray];
    updatedIsClickArray[index] = !updatedIsClickArray[index];
    setIsClickArray(updatedIsClickArray);
  };

  const renderItemFavorite = ({ itemf, index }) => (
    <View style={styles.body}>
      <View>
        <Image style={styles.img} source={{uri: itemf.image_preview}} />
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{itemf.product_name}</Text>
            <Text style={{ marginTop: 5 }}>Giá: {itemf.max_price}</Text>
            <Text style={{ marginTop: 5 }}>Loại: {itemf.brand_name}</Text>
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
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sản phẩm yêu thích</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontWeight: '500', color: 'blue' }}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={favorite}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemFavorite}
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
    height: 250,
    borderRadius: 20,
    shadowColor: 'grey',
    shadowRadius: 10,
    alignItems: 'center',
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

export default FavoriteScreen;
