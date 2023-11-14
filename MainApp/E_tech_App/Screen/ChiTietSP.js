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
import ViewMoreText from 'react-native-view-more-text';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import ProductComment from '../Component/ProductComment';
import ListProductHorzontal from './ListProductHorizontal';

const ProductDetail = ({product}) => {
  const navigation = useNavigation();
  const data = [
    { id: 1, color: 'Trắng' },
    { id: 2, color: 'Đen' },
    { id: 3, color: 'Xanh dương' },
    { id: 4, color: 'Hồng' },
  ];
  const renderViewMore = (onPress) => <Text style={tailwind `ml-3`} onPress={onPress}>View more</Text>;
  const renderViewLess = (onPress) => <Text  style={tailwind `ml-3`} onPress={onPress}>View less</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={tailwind `flex-row w-full h-20`}>
          <TouchableOpacity 
            style={tailwind `w-10 h-full self-start justify-center flex-auto ml-5`}
            onPress={() => {navigation.goBack()}}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={tailwind `w-10 h-full justify-center self-center mr-5`}>
            <AntDesign name="hearto" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={tailwind `w-80 self-center py-5 bg-white shadow-lg rounded-lg`}>
          <Image
            source={{uri: product.image_preview}}
            style={styles.img}
          />
        </View>

        <View style={tailwind `flex-row py-5 px-5`}>
          <Text style={tailwind `text-xl font-bold w-42`}>{product.product_name}</Text>
          <Text style={tailwind `text-xl ml-28`}>{product.max_price}</Text>
        </View>

        <View style={tailwind `w-90 h-0.5 bg-gray-300 self-center`}></View>

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
          <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            textStyle={{ fontSize: 14, marginBottom: 10, marginLeft: 10 }}
          >
            <Text>
              Iphone 15 là sản phẩm mới nhất của Apple, mang đến cho người dùng
              trải nghiệm tuyệt vời với màn hình OLED 6.7 inch, ...{' '}
            </Text>
          </ViewMoreText>
        </View>

        <View style={tailwind `w-90 h-0.5 bg-gray-300 self-center`}></View>
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

        <View style={tailwind `w-90 h-0.5 bg-gray-300 self-center`}></View>

        <View style={{ height: 120, marginTop: 8 }}>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.text6}>MUA NGAY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.text6}>THÊM VÀO GIỎ HÀNG</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 300, marginTop: 20 }}>
          <View style={{marginLeft: 10, flex: 1 }}>
            <View style={tailwind `flex-row`}>
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
                  }}
                  onPress={() => navigation.navigate('ListPhone')}
                  >
                  MORE
                </Text>
              </TouchableOpacity>
            </View>

            <ListProductHorzontal />
          </View>
        </View>
        <View style={{ height: 300, marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.text3}>Bình Luận</Text>
          <ProductComment/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function ChiTietSP({route}) {
  const {product} = route.params;
  console.log(product);
  return (
    <ProductDetail product={product}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    width: '80%',
    height: 230,
    backgroundColor: 'white'
  },
  view2: {
    height: 70,
    flexDirection: 'row'
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
    width: '90%',
    height: 60,
    paddingLeft: 10
  },
  view5: {
    height: 'auto',
    marginVertical: 15,
    width: '90%',
    paddingLeft: 10
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
    fontWeight: "bold",
  },
  text2: {
    fontSize: 18,
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
