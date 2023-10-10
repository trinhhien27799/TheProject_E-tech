import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function ChiTietSP() {
  const data = [
    { id: 1, color: 'Trắng' },
    { id: 2, color: 'Đen' },
    { id: 3, color: 'Xanh dương' },
    { id: 4, color: 'Hồng' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.view}>
          <Image source={require('../img/sp.png')} style={styles.img} />
        </View>

        <View style={styles.view2}>
          <Text style={styles.text1}>Iphone 15 (128GB) </Text>
          <Text style={styles.text2}>$40000</Text>
        </View>

        <View style={styles.view3}></View>

        <View style={styles.view4}>
          <Text style={styles.text3}>Màu sắc</Text>
          <FlatList
            horizontal
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.text4}>{item.color}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.view5}>
          <Text style={styles.text5}>
            Iphone 15 là sản phẩm mới nhất của Apple, mang đến cho người dùng
            trải nghiệm tuyệt vời với màn hình OLED 6.7 inch, ...{' '}
          </Text>
        </View>

        <View style={{ height: '20%', marginTop: 8 }}>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.text6}>MUA NGAY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.text6}>THÊM VÀO GIỎ HÀNG</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: '30%', backgroundColor: 'red' }}>
          <Text style={styles.text3}>Bình Luận</Text>
          <ScrollView></ScrollView>
        </View>

        <View style={{ height: '60%', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontStyle: 'bold' }}>
              Các sản phẩm liên quan
            </Text>
            <TouchableOpacity>
              <Text style={{ color: '#336BFA', fontSize: 13 , textAlign: 'left'}}>MORE</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{borderLeftColor: 'red'}}>
          </ScrollView>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  view: {
    width: '100%',
    height: 160,
  },
  view2: {
    height: '15%',
    marginTop: 20,
  },
  view3: {
    height: 0.5,
    width: '90%',
    backgroundColor: '#33FFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
  view4: {
    width: '100%',
    height: 60,
  },
  view5: {
    height: '22%',
    marginTop: 15,
  },
  img: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  text1: {
    fontSize: 20,
    marginLeft: 10,
  },
  text2: {
    fontSize: 18,
    marginLeft: 40,
  },
  text3: {
    fontSize: 14.5,
    marginLeft: 10,
    marginTop: 5,
  },
  text4: {
    fontSize: 13,
    color: 'black',
  },
  text5: { fontSize: 14, marginLeft: 10, marginRight: 8 },
  text6: {
    fontSize: 14,
    color: 'white',
  },
  button: {
    width: '90%',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  button2: {
    backgroundColor: '#336BFA',
    width: '90%',
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    marginTop: 10,
  },
});
