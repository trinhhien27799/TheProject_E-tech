import { Alert } from 'react-native'

const useRequireLogin = (navigation) => {

  Alert.alert(
    'Yêu cầu đăng nhập',
    'Bạn cần đăng nhập để tiếp tục. Bạn có muốn đăng nhập không?',
    [
      {
        text: 'Hủy',
        onPress: () => console.log('Hủy'),
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => navigation.navigate('Login'),
      },
    ],
    { cancelable: false }
  )
}

export { useRequireLogin }
