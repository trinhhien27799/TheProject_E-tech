import React from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            flex: 1,
            marginLeft: 130,
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
            <View style={styles.view}>
              <View style={{ width: '20%' }}>
                <Ionicons
                  name="md-notifications-outline"
                  size={40}
                  color="black"
                  style={styles.img}
                />
              </View>
              <View>
                <Text style={styles.title}>{item.status}</Text>
                <Text style={styles.title2}>{item.time}</Text>
              </View>
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
    paddingTop: 30,
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  title2: {
    fontSize: 14,
    marginTop: 10,
  },
  img: {
    height: 100,
    width: 100,
    padding: 10,
  },
  view: {
    width: '100%',
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
