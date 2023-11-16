import React, { useEffect, useState } from 'react';
import { View,  Text, TouchableOpacity,Image, StyleSheet, FlatList } from 'react-native';
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
      <View style = {styles.titleContainer}>
          <Image style={{width:25,height:25,marginRight:10}} source={require('../../img/highlight1.png')}/>
          <Text style={styles.textTitle}>Sản phẩm yêu thích</Text>
        </View>
        <TouchableOpacity onPress={() => {
          handleMore();
        }}>
          <Text style={{ fontWeight: '500', color: 'blue',marginRight:15 }}>More</Text>
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
  titleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle:{
    fontWeight: '700',
    fontSize: 17,
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
