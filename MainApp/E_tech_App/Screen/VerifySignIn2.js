import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const VerifySignIn2 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Chúng tôi vừa gửi mã xác nhận đến địa chỉ Email của bạn. Nhập mã xác
          nhận :
        </Text>
        <View style={{ marginBottom: 12, marginTop: 12 }}>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Mã xác nhận"
              placeholderTextColor={'black'}
              style={{ width: '100%', fontSize: 16 }}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
            TIẾP TỤC
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                color: '#336BFA',
                marginRight: 8
              }}>
              Gửi lại mã
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 3,  
              width: 8,
              backgroundColor: '#0000FF',
              marginTop: 10
            }}></View>
          <TouchableOpacity >
            <Text
              style={{
                fontSize: 15,
                color: 'red',
                marginLeft: 8
              }}>
              Hủy bỏ
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
  },
  viewInput: {
    width: '100%',
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },

  button: {
    height: 50,
    backgroundColor: '#336BFA',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: '48%',
    marginTop: 20,
  },
});

export default VerifySignIn2;
