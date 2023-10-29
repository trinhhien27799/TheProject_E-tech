import React from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import tailwind from 'twrnc';

const NotificationScreen = (props) => {
  const data = [
    {
      id: 1,
      status: 'Ở đây có voucher giảm đến 500.000đ! ',
      time: '9h42 AM',
    },
    {
      id: 2,
      status: 'Đơn hàng đã giao thành công!',
      time: '6/10/2023',
    },
    {
      id: 3,
      status: 'Đơn hàng của bạn đã được chuyển đi!',
      time: '6/10/2023',
    },
    {
      id: 4,
      status: 'Đơn hàng của bạn đã được chuyển đi!',
      time: '6/10/2023',
    },
    {
      id: 5,
      status: 'Đơn hàng của bạn đã được chuyển đi!',
      time: '6/10/2023',
    },
  ];

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
        <Entypo
          name="dots-three-vertical"
          size={24}
          color="black"
          style={{ marginRight: 8 }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={tailwind`w-90 flex-row border border-gray-400 rounded-lg mt-5 justify-center`}>
                <View style={{ width: '20%' }}>
                  <Ionicons
                    name="md-notifications-outline"
                    size={40}
                    color="black"
                    style={styles.img}
                  />
                </View>

                <View style={tailwind`w-64`}>
                  <Text style={styles.title}>{item.status}</Text>
                  <Text style={styles.title2}>{item.time}</Text>
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
    height: 100,
    width: 100,
    padding: 12,
    paddingVertical: 30
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
