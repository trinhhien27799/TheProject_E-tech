import React from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const NotificationScreen = (props) => {
  const data = [
    {
        id: 1,
        status: 'Đơn hàng đã giao thành công!',
        time: '6/10/2023',
    },
    {
        id: 2,
        status: 'Đơn hàng đã giao thành công!',
        time: '6/10/2023',
    },
    {
        id: 3,
        status: 'Đơn hàng đã giao thành công!',
        time: '6/10/2023',
    },
]
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <View style={{ width: '30%' }}>
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
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  title: {
    fontSize: 15,
    paddingTop: 10,
  },
  title2: {
    fontSize: 15,
    paddingTop: 20,
  },
  img: {
    height: 200,
    width: 200,
    padding: 8,
    paddingStart: 20,
  },
  view: {
    width: '90%',
    height: 90,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 10,
    flexDirection: 'row',
    marginVertical: 6,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginTop:15
  },
});
