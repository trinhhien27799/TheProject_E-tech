import { useEffect, useState } from "react"
import { Dimensions, FlatList, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native"
import { getFavorites, deleteListFavorite } from "../../CallApi/productApi"
import IteamProduct from "./itemProducts"
import LoadingWidget from "../../Component/loading"
import { useNavigation } from "@react-navigation/native"
import LottieView from 'lottie-react-native'


const FavoriteScreen = () => {
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await getFavorites()
      setData(response)
    } catch (error) {
      console.log('FavoriteScreen: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const RenderItem = ({ item, index, }) => {
    return <IteamProduct item={item} index={index} navigation={navigation} list={list} setList={setList} />
  }



  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa không?',
      [{ text: 'Hủy', style: 'cancel', },
      {
        text: 'Xóa',
        onPress: () => {
          deleteItems()
        },
      },],
      { cancelable: false }
    )
  }

  const deleteItems = async () => {
    try {
      setDeleteLoading(true)
      const response = await deleteListFavorite(list)
      console.log(response.message)
      if (response.code == 200) {
        setList([])
        const newData = data.filter(item => !list.includes(item._id))
        setData(newData)
      }
    } catch (error) {
      console.log('Xóa thất bại')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}>
          <Image source={require('../../img/arrow-left.png')}
            style={{ width: 16, height: 16, marginEnd: 20 }}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Danh sách yêu thích</Text>
        <View style={{ flex: 1 }} />
        {list.length > 0 &&
          (deleteLoading ?
            <LottieView
              autoPlay
              style={{ width: 28, height: 28 }}
              source={require('../../assets/logo.json')}
            />
            :
            <TouchableOpacity
              onPress={handleDelete}>
              <Text style={{ color: 'red' }}>Xóa</Text>
            </TouchableOpacity>
          )}
      </View>
      {loading ? <LoadingWidget /> :
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderItem}
          style={{ width: Dimensions.get('window').width }}
        />}
    </View>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  header: {
    width: Dimensions.get('window').width,
    borderBottomWidth: 1.1,
    borderBottomColor: '#D5D5D5',
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})