import { useNavigation } from "@react-navigation/native";
import { addCart } from "../CallApi/cartApi";

export const AddCartArray = (productArray) => {
    console.log(productArray.length);
    const navigation = useNavigation();

    for (let i = 0; i < productArray.length; i++) {
        addCart(productArray[i]);
    }

    navigation.navigate('CartScreen');
}