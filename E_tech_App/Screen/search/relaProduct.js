import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View,StyleSheet } from "react-native";
import itemFlatlist from "../../Component/itemFlatlist";
import ItemFlatlist from "../../Component/itemFlatlist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllProduct, getItemProduct } from "../../CallApi/productApi";

const RelaProduct = ({brand}) => {
        const [dataProduct,setDataProduct] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const product = await getAllProduct();
            
            // const itemProduct = await getItemProduct({product_id:})
            setDataProduct(product);
        }
        fetchData();
    },[]);
    const filteredData = dataProduct.filter((item) => item.brand_name == brand);
    return (
                <FlatList
                data={filteredData}
                renderItem={({item})=>{   
                    return <ItemFlatlist key={item._id} route={item}/>
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