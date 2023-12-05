import React,{useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isValidEmail } from '../../Component/validation';
import { useNavigation } from '@react-navigation/native';
import { insertOtp } from '../../CallApi/authenApi';

const Quenmk1 = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const isValidOk = () => !!email.trim()&&isValidEmail(email);
  const [isSignUpPressed, setIsSignUpPressed] = useState(true);
  const handleCheck = async () => {
    try {
        navigation.navigate('ConfirmOTP',{isSignUpPressed,email});
        insertOtp(email,true);
        setEmail('');
    } catch (error) {
        console.error('Error:', error);
    }
}
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view1}>
      <Ionicons name="arrow-back" size={24} color="black"  onPress={() => {
                        navigation.goBack();
                    }}/>
      </View>
      <View style={styles.view}>
        <View style={{marginLeft:5}}>
        <Text style={{fontSize:25,fontWeight:'bold',marginBottom:5}}>Email xác nhận</Text>
        <Text >Nhập địa chỉ Email để xác minh</Text>
        </View>
        <View style={{ marginBottom: 12, marginTop: 30 }}>
          <Text style={{margin:10,fontSize:20}}>Email</Text>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="etech@gmail.com "
              value={email}
              onChangeText={(text) => {
                setErrorEmail(isValidEmail(text) ? '' : 'Email không hợp lệ');
                setEmail(text);
              }}
              placeholderTextColor={'black'}
              style={{ width: '100%', fontSize: 16 }}
            />
          </View>
          <Text style={{ color: 'red', margin: 10 }}>{errorEmail}</Text>
        </View>
        <TouchableOpacity
          disabled={!isValidOk()}
          onPress={handleCheck}
          style={[styles.button, { backgroundColor: isValidOk() == true ? '#336BFA' : 'grey' }]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
            TIẾP TỤC
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
    marginTop: '10%'
  },
  view: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  view1: {
    flexDirection: 'row',
    height: 30,
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
  text: {
    marginLeft: 80,
    fontSize: 18,
    fontWeight: 'bold',
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
    width: '48%',
    marginTop: 20,
  },
});

export default Quenmk1;
