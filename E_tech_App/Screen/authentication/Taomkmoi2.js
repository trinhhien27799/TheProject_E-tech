import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const Taomk2 = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ alignItems: 'center', marginTop:80, }}>
        <Image source={require('../../img/secuety.png')} style={styles.img} />
      </View>
      <View style={styles.view}>
        <View>
        <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',margin:'10%'}}>Đặt mật khẩu mới{'\n'}thành công</Text>
        <Text style={{ fontSize: 18,color:'grey',textAlign:'center',marginBottom:10 }}>
          Chúc mừng! Mật khẩu của bạn đã được đặt lại thành công. Vui lòng
          chuyển sang màn hình đăng nhập để đăng nhập lại.
        </Text>
        </View>
        <TouchableOpacity 
        onPress={() => {
          navigation.navigate('Login')
      }}
        style={styles.button}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  img: {
    resizeMode: 'cover',
    height: 280,
    width: 200,
    
  },
  button: {
    height: 50,
    backgroundColor: '#336BFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: '60%',
    marginTop: 20,
  },
});

export default Taomk2;
