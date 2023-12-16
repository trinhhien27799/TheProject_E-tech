import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View,Text } from "react-native";
import { getVoucher } from "../../session";
import ItemProduct from "../../Component/hooks/useItemProducts";


const Voucher = ()=>{
    const {dataVoucher} = ItemProduct();
    return(
            <TouchableOpacity style={styles.container} 
                onPress={()=>{
                    console.log(dataVoucher);
                }}
            >
                <Text>Voucher</Text>
            </TouchableOpacity>
    )
}
export default Voucher;
const styles = StyleSheet.create({

});