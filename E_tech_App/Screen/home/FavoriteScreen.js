import React, { useEffect, useState } from 'react';
import { View,  Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { getLike } from '../../CallApi/productApi';
import IteamProduct from '../../Component/itemProducts';

const FavoriteScreen = () => {
  const [favoritesData,setFavoritesData] = useState([])
  useEffect(() => {
    const fetchData = async() =>{
        const data = await getLike();
        setFavoritesData(data);
    };
    fetchData();
  })
  const handleMore = async()=>{
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sản phẩm yêu thích</Text>
        <TouchableOpacity onPress={() => {
          handleMore();
        }}>
          <Text style={{ fontWeight: '500', color: 'blue' }}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={favoritesData}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item})=>{   
          return <IteamProduct key={item._id} route={item}/>
      }}
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
