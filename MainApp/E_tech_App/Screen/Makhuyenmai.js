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
export default function Makhuyenmai() {
  const data = [
    {
      id: 1,
      name: 'Giảm giá 20%',
      hsd: '30/10/2023'
    },
    {
      id: 2,
      name: 'Miễn phí vận chuyển',
      hsd: '30/10/2023'
    },
    {
      id: 3,
      name: 'Giảm 30% phí vận chuyển',
      hsd: '30/10/2023'
    },
    {
      id: 4,
      name: 'Giảm giá 10%',
      hsd: '30/10/2023'
    },
    {
      id: 5,
      name: 'Giảm giá 50%',
      hsd: '30/10/2023'
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
              <View style={{ width: '28%', paddingTop: 10 }}>
                <Image source={require('../img/sale.png')} style={styles.img} />
              </View>
              <View style={{ paddingTop: 10 , width: '40%' }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title2}>{item.hsd}</Text>
              </View>
              <View style={{ paddingTop: 10 }}>
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
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
  },
  img: {
    height: 80,
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
    width : '60%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    marginLeft : 8,
    marginTop: 10
  },
});
