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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ListItem from "../ListItem";
import data3 from '../items';


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
        <View style={{ height: 35, flexDirection: 'row', padding: 5, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </View>
          <View style={{ marginRight: 8 }}>
            <AntDesign name="hearto" size={20} color="black" />
          </View>
        </View>
        <View style={styles.view}>
          <Image
            source={require('./assets/logo-cac-hang-dien-thoai-5.jpg')}
            style={styles.img}
          />
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
          <Text style={styles.text3}>Mô tả sản phẩm</Text>
          <Text style={styles.text5}>
            Iphone 15 là sản phẩm mới nhất của Apple, mang đến cho người dùng
            trải nghiệm tuyệt vời với màn hình OLED 6.7 inch, ...{' '}
          </Text>
        </View>
        <View style={styles.view3}></View>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14.5,
              marginLeft: 10,
              fontWeight: 'bold',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}>
            Chi tiết sản phẩm
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginLeft: 25,
              marginRight: 8,
              marginTop: 'auto',
              marginBottom: 'auto',
            }}>
            Kho, Dung lượng, ...
          </Text>
          <Feather
            name="chevron-right"
            size={30}
            color="black"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        </View>
        <View style={styles.view3}></View>

        <View style={{ height: 120, marginTop: 8 }}>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.text6}>MUA NGAY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.text6}>THÊM VÀO GIỎ HÀNG</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 300, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', marginLeft: 10, flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>
              Các sản phẩm liên quan
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#336BFA',
                  fontSize: 13,
                  marginRight: 8,
                  marginTop: 3,
                }}>
                MORE
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {data3.map((item, index) => (
                <ListItem key={index} item={item} />
            ))}
        </ScrollView>
        </View>
        <View style={{ height: 300, backgroundColor: 'red', marginTop: 20 }}>
          <Text style={styles.text3}>Bình Luận</Text>
          <ScrollView></ScrollView>
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
    height: 230,
  },
  view2: {
    height: 70,
    marginTop: 20,
    marginLeft: 10,
  },
  view3: {
    height: 1,
    width: '90%',
    backgroundColor: '#0000FF',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
  view4: {
    width: '100%',
    height: 60,
  },
  view5: {
    height: 160,
    marginTop: 15,
  },
  img: {
    width: '80%',
    height: 230,
    resizeMode: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 15,
  },
  text1: {
    fontSize: 20,
    marginLeft: 10,
  },
  text2: {
    fontSize: 18,
    marginLeft: 200,
  },
  text3: {
    fontSize: 14.5,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  text4: {
    fontSize: 13,
    color: 'black',
  },
  text5: { fontSize: 14, marginLeft: 10, marginRight: 8, marginTop: 8 },
  text6: {
    fontSize: 14,
    color: 'white',
  },
  button: {
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
    borderRadius: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
});
