import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import tailwind from 'twrnc';
import { getNotifi } from '../CallApi/productApi';

const NotificationScreen = (props) => {
  const [datas, setData] = useState([]);
  const [seen,setSeen] = useState(false);
  const getTime = ({time}) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (hours+':'+minutes+ '  ' + day + '-' + month + '-' + year).toString();
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotifi({action:'get'});
      setData(data);
      
    }
    fetchData();
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            flex: 1,
            alignContent: 'center',
            fontFamily: 'Roboto'
          }}>
          THÔNG BÁO
        </Text>

        <TouchableOpacity
          onPress={()=>{
          }}
        >
          <Entypo
            name="dots-three-vertical"
            size={24}
            color="black"
            style={{ marginRight: 8 }}
          />
          
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <FlatList
          data={datas}
          renderItem={({ item }) => (
            <View >
              <TouchableOpacity style={[item.seen?{ backgroundColor:'#AADAE9',opacity:0.5}:null,tailwind`w-90 flex-row border border-gray-400 rounded-lg mt-5 justify-center p-5`]}>
                <View style={{ width: '15%', height: '50%'}}>
                  <Image source={{ uri: item.image }} style={styles.img} />
                </View>
                <View style={tailwind`w-64 ml-5`}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.title2}>{getTime({time:item.time})}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 8,
    width: 'auto'
  },
  title2: {
    fontSize: 14,
    marginTop: 10,
  },
  img: {
    flex: 1,
    resizeMode: "cover",
  },
  view: {
    width: '90%',
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 10,
    flexDirection: 'row',
    borderColor: '#99CCFF',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 8,
  },
});
