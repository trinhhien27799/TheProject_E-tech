var price = null;
var image = null;

export const setPrice = (newPrice)=>{
    price = newPrice;
}
export const setImage = (newImage)=>{
    image = newImage;
}
export const getPrice = ()=>{
    return price;
}
export const getImage = ()=>{
    return image+'';
}