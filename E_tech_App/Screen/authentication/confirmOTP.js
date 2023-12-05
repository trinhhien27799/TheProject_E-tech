import React, { useState,useRef,useEffect } from 'react';
import {Text,SafeAreaView,StyleSheet,TextInput, TouchableOpacity,View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { insertOtp, verifyOTP } from '../../CallApi/authenApi';
const ConfirmOTP = ({route}) => {
  const isSignUpPressed = route.params.isSignUpPressed;
  const email = route.params.email;
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const firtInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourInput = useRef();
  const fiveInput = useRef();
  const sixInput = useRef();
  const [remainingTime, setRemainingTime] = useState(120);
  const [checkTime, setCheckTime] = useState(false);
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
};
useEffect(() => {
  if (isSignUpPressed) {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(interval);
        setCheckTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }

}, [remainingTime, isSignUpPressed]);


  const isValidOk = () => !!otp.join().trim();
  const handleCheck = async () => {
    const otpString = otp.join("");
    try {
      const verificationResult = await verifyOTP(email, otpString);
      if(verificationResult.code ==200){
        navigation.navigate('Taomk',email)
      }
      alert(verificationResult.message);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view1}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => {
          navigation.navigate('Quenmk1')
        }} />
        <Text style={styles.text}>Quên mật khẩu</Text>
      </View>
      <View style={styles.view}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>
          Xác thực email
        </Text>
        <Text style={{ color: 'grey' }}> Nhập mã xác minh gồm 6 chữ số gửi tới địa chỉ email của bạn.</Text>
        <View style={{ marginTop: 30 }}>
          <BoxVerity
                firtInput={firtInput}
                secondInput={secondInput}
                thirdInput={thirdInput}
                fourInput={fourInput}
                fiveInput={fiveInput}
                sixInput={sixInput}
                otp={otp}
                onOtpChange={handleOtpChange}
            />
        </View>
        <View style={{justifyContent:'center',marginBottom:'5%',flexDirection:'row'}}>
           <TouchableOpacity
           disabled={!checkTime}
           onPress={()=>{
            insertOtp(email,true);
            setRemainingTime(120);
            setCheckTime(false);
           }}
           >
            <Text style={{color:checkTime?'black':'#CED3D0'}}>Gửi lại mã xác nhận</Text>
           </TouchableOpacity>
           {remainingTime>=1 ?(<Text style={{ color: 'red',marginLeft:5 }}>{remainingTime} giây</Text>):null }
           
        </View>
        <TouchableOpacity
         disabled={!isValidOk()}
          onPress={handleCheck}
          style={[styles.button]}
          >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>
            TIẾP TỤC
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const BoxVerity = ({ firtInput, secondInput, thirdInput, fourInput, fiveInput, sixInput, onOtpChange }) => {
  return (
      <View style={styles.boxContainer}>
          <View style={styles.otpBox}>
              <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={
                      (text) => {
                          text && secondInput.current.focus();
                          onOtpChange(0, text);
                      }
                  }
                  ref={firtInput}

              />
          </View>
          <View style={styles.otpBox}>
              <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={secondInput}
                  onChangeText={(text) => {
                      text && thirdInput.current.focus();
                      onOtpChange(1, text);
                  }}
              />
          </View>
          <View style={styles.otpBox}>
              <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={thirdInput}
                  onChangeText={(text) => {
                      text && fourInput.current.focus();
                      onOtpChange(2, text);
                  }}
              />
          </View>
          <View style={styles.otpBox}>
              <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fourInput}
                  onChangeText={(text) => {
                      text && fiveInput.current.focus();
                      onOtpChange(3, text);
                  }}
              />
          </View>
          <View style={styles.otpBox}>
              <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fiveInput}
                  onChangeText={(text) => {
                      text && sixInput.current.focus();
                      onOtpChange(4, text);
                  }}
              />
          </View>
          <View style={styles.otpBox}>
              <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={sixInput}
                  onChangeText={(text) => {
                      onOtpChange(5, text);
                  }}
              />
          </View>
      </View>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginTop: '10%',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%'
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
  boxContainer: {
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
},
otpBox: {
    borderRadius: 5,
    height: 60,
    width: 50,
    margin: 10,
    borderColor: 'black',
    borderWidth: 0.5
},
otpText: {
    fontSize: 25,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10
}
});

export default ConfirmOTP;
