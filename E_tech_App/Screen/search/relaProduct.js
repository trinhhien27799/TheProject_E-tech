import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View,StyleSheet } from "react-native";
import ItemFlatlist from "../../Component/itemFlatlist";
import { getAllProduct } from "../../CallApi/productApi";
import LoadingWidget from "../../Component/loading";

const RelaProduct = ({brand}) => {
        const [dataProduct,setDataProduct] = useState([]);
        const [isLoading,setIsloading]= useState(true);
        const fetchData = async()=>{
           try {
            setIsloading(true);
            const product = await getAllProduct();
            setDataProduct(product);
           } catch (error) {
                console.log(error);
           }finally{
            setIsloading(false);
           }
        }
        useEffect(()=>{
        fetchData();
    },[]);
    const filteredData = dataProduct.filter((item) => item.brand_name == brand);
    return (
        isLoading?<View style={{alignItems:"center",margin:'50%'}}><LoadingWidget /></View>:
                <FlatList
                data={filteredData}
                renderItem={({item})=>{   
                    return <ItemFlatlist  route={item}/>
                }}
                keyExtractor={item => item._id}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer}
            />
    );

}
export default RelaProduct;
const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
      },
});