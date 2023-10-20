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
  import { Feather } from '@expo/vector-icons';
  
  const Pay = ({ username, diachi, price1, ship }) => {
    const priceall = price1 + ship;
    const data = [
      {
        id: 1,
        name: 'IPhone 15 Pro Max',
        price: '20.000.000',
        hang: 'Apple',
      },
      {
        id: 2,
        name: 'IPhone 15 Pro Max',
        price: '20.000.000',
        hang: 'Apple',
      },
      {
        id: 3,
        name: 'IPhone 15 Pro Max',
        price: '20.000.000',
        hang: 'Apple',
      },
      {
        id: 4,
        name: 'IPhone 15 Pro Max',
        price: '20.000.000',
        hang: 'Apple',
      },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.view}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.text}>Thanh toán</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', height: 30, marginLeft: 20 }}>
              <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold' }}>
                Các sản phẩm
              </Text>
              <Image source={require('../img/store.png')} style={styles.img1} />
            </View>
            <View style={{ marginTop: 10, height: 400 }}>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <View style={styles.view2}>
                    <View style={{ width: '28%', paddingTop: 10 }}>
                      <Image
                        source={require('../img/store.png')}
                        style={styles.img}
                      />
                    </View>
                    <View
                      style={{ paddingTop: 10, width: '40%', marginLeft: 20 }}>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text style={styles.title2}>{item.price}</Text>
                      <Text style={styles.title2}>{item.hang}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={{ justifyContent: 'flex-end', marginTop: 20 }}>
              <Text style={{ fontSize: 14, marginLeft: 20 }}>
                Tổng cộng: {price1}{' '}
              </Text>
            </View>
            <View style={styles.view3}></View>
            <View style={{ marginTop: 30 }}>
              <View style={{ flexDirection: 'row', height: 30, marginLeft: 20 }}>
                <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold' }}>
                  Địa chỉ nhận hàng
                </Text>
                <Image
                  source={require('../img/location.png')}
                  style={styles.img1}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                height: 50,
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14.5,
                    marginLeft: 10,
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}>
                  Username - Phone{username}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 25,
                    marginRight: 8,
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}>
                  Địa chỉ {diachi}
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={45}
                color="black"
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginRight: 40,
                }}
              />
            </View>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', marginRight: 20 }}>
                Phí vận chuyển: {ship}
              </Text>
            </View>
            <View style={styles.view3}></View>
            <View style={{ marginTop: 30 }}>
              <View style={{ flexDirection: 'row', height: 50, marginLeft: 20 }}>
                <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold' }}>
                  Phương thức thanh toán
                </Text>
                <Image
                  source={require('../img/paymain.png')}
                  style={styles.img1}
                />
              </View>
            </View>
            <View
              style={{
                height: 50,
                flexDirection: 'row',
                marginLeft: 20,
                marginTop: 10,
              }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14.5,
                    marginLeft: 10,
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}>
                  Thanh toán khi nhận hàng
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={45}
                color="black"
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginRight: 40,
                }}
              />
            </View>
          </View>
          <View style={styles.view3}></View>
          <View
            style={{
              marginTop: 20,
              height: 150,
              justifyContent: 'center',
              marginLeft: 20,
            }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14.5,
                  marginLeft: 40,
                  fontWeight: 'bold',
                }}>
                Thanh toán:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 40,
                }}>
                200000000đ {priceall}
              </Text>
            </View>
            <TouchableOpacity style={styles.button2}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                Thanh toán
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  export default Pay;
  
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
      marginLeft: 80,
      fontSize: 18,
      fontWeight: 'bold',
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
      marginTop: 15,
    },
    view3: {
      height: 1,
      width: '90%',
      backgroundColor: 'black',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 15,
    },
    img: {
      height: 60,
      width: 60,
      padding: 10,
      marginLeft: 20,
      marginTop: 10,
      resizeMode: 'cover',
    },
    img1: {
      height: 40,
      width: 30,
      marginRight: 50,
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
      height: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      padding: 10,
      marginRight: 'auto',
      marginLeft: 'auto',
      marginBottom: 20
    },
  });
  