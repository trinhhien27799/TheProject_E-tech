import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View,TouchableOpacity  } from "react-native";
import LabelItems from "../../Model/itemHangPhone";
import { useNavigation } from '@react-navigation/native';

const ListProduct = (props) => {
     const navigation = useNavigation();

    const renderItem = ({ item }) => {
        return (
            <View style={styles.viewItem}>
                 <TouchableOpacity  onPress={() =>navigation.navigate('ListPhoneByCate', {
              data: item.name
            })}>
                <Image style={styles.image} source={item.img} />
                </TouchableOpacity>
            </View>
           
        );
    };
    return (
        <View style={styles.container}>
           <View style = {styles.titleContainer}>
          <Image style={{width:25,height:25,marginRight:10}} source={require('../../img/newspaper.png')}/>  
          <Text style={styles.textTitle}>Thương hiệu hàng đầu</Text>
        </View>
                <FlatList
                    horizontal
                    data={LabelItems}
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    renderItem={renderItem}
                    keyExtractor={(item) =>item = item.img }
                    contentContainerStyle={styles.flatListContent}
                />
           
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        marginTop:30,
        marginLeft:15
    },
    textTitle:{
        fontWeight: '700',
        fontSize: 17,
      },
    
      titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
      },
    textTitle:{
        fontWeight: '700',
        fontSize: 18,
      },
   
    flatListContent: {
        flexDirection: 'row',
        
    },
    image: {
        width: 110,
        resizeMode: 'contain',
    },
    viewItem: {
        backgroundColor: 'white',
        width: 150,
        height: 70,
        borderRadius: 8,
        alignItems: 'center',
        shadowRadius: 10,
        marginTop:15,
        marginRight:10,
        justifyContent:'center',
        shadowOpacity:0.05,
      
    },
    textItem: {
        fontSize: 20,
        fontWeight: 'bold',
    }

});

export default ListProduct;
