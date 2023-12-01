import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image, Dimensions, Alert, TouchableWithoutFeedback } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import tailwind from 'twrnc'
import { getNotifications, seenAllNotification, deleteAllNotification } from '../CallApi/notificationApi'
import { formatTime } from '../utils/format'
import { useNavigation } from '@react-navigation/native'
import LoadingWidget from '../Component/loading'


const NotificationScreen = () => {
  const [data, setData] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await getNotifications()
      setData(response)
      await seenAllNotification()
    } catch (error) {
      console.log(`Notification fetchData : ${error}`)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })
    return unsubscribe
  }, [navigation])


  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa tất cả thông báo không?',
      [{ text: 'Hủy', style: 'cancel', },
      {
        text: 'Xóa',
        onPress: () => {
          deleteAll()
        },
      },],
      { cancelable: false }
    )
  }

  const deleteAll = async () => {
    try {
      setData([])
      setShowPopup(false)
      await deleteAllNotification()
    } catch (error) {
      console.log(`Notification deleteAll: ${error}`)
    }
  }
  const handleOutsidePress = () => {
    setShowPopup(false)
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Thông báo
          </Text>

          {data.length > 0 && <TouchableOpacity
            onPress={() => {
              setShowPopup(!showPopup)
            }}
          >
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="black"
            />

          </TouchableOpacity>}
        </View>
        <View style={{
          alignItems: 'center',
          flex: 1,
          width: '100%',
        }}>
          {loading ?
            <LoadingWidget />
            :
            <FlatList
              style={{ width: '100%', backgroundColor: 'whitesmoke' }}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={[{ borderColor: item.seen ? 'grey' : 'blue', opacity: item.seen ? 0.6 : 1 }, styles.viewItem]}>
                  <View>
                    <Image source={{ uri: item.image }} style={styles.img} />
                  </View>
                  <View style={tailwind`w-64 ml-5`}>
                    <Text style={styles.title}>{item.body}</Text>
                    <Text style={styles.title2}>{formatTime(item.time)}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />}
        </View>
        {showPopup && (
          <View style={styles.popupView}>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.itemPopup}>Xóa tất cả</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView >
    </TouchableWithoutFeedback>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black'
  },
  title2: {
    fontSize: 11,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  viewItem: {
    width: '95%',
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: Dimensions.get('window').width * 0.05 / 2,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    borderBottomWidth: 1.1,
    borderBottomColor: '#D5D5D5',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  popupView: {
    width: '30%',
    elevetion: 20,
    position: 'absolute',
    top: 55,
    right: 10,
    borderWidth: 0.5,
    borderColor: 'grey'
  },
  itemPopup: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingStart: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
  }
})
