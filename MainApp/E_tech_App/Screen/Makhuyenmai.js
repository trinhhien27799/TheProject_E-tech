import {
    Image,
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  export default function App() {
    const data = [
      {
        id: 1,
        name: 'Iphone 15',
        price: '20.000.000',
        hang: 'Apple',
        status: 'Còn hàng',
      },
      {
        id: 2,
        name: 'Iphone 15',
        price: '20.000.000',
        hang: 'Apple',
        status: 'Còn hàng',
      },
      {
        id: 3,
        name: 'Iphone 15',
        price: '20.000.000',
        hang: 'Apple',
        status: 'Còn hàng',
      },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Ionicons name="arrow-back" size={30} color="black" />
          <Text style={styles.text}>Mã khuyến mại</Text>
        </View>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.view2}>
                <View style={{ width: '30%', paddingTop: 10 }}>
                  <Image source={require('../img/sale.png')} style={styles.img} />
                </View>
                <View style={{ paddingTop: 5 }}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.title2}>{item.price}</Text>
                  <Text style={styles.title2}>{item.hang}</Text>
                  <Text style={styles.title2}>{item.status}</Text>
                </View>
                <View style={{ marginLeft: 20, paddingTop: 10 }}>
                  <TouchableOpacity style={styles.button2}>
                    <Text style={{ color: 'white' }}>Lưu mã khuyến mại</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 30,
    },
    view: {
      flexDirection: 'row',
      height: 30,
    },
    text: {
      marginLeft: 60,
      fontSize: 18,
    },
    view2: {
      width: '90%',
      height: 90,
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'row',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 20,
      marginTop: 15,
    },
    img: {
      height: 60,
      width: 80,
      padding: 8,
      paddingStart: 20,
    },
    title: {
      fontSize: 16,
    },
    title2: {
      fontSize: 13,
    },
    button2: {
      backgroundColor: '#336BFA',
      width: '80%',
      height: 70,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 10,
    },
  });
  