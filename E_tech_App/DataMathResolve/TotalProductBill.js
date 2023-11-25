export const TotalProductBill = (productArray) => {
    var totalResult = 0;
    for (var i = 0; i < productArray.length; i++) {
        totalResult += (productArray[i].price * productArray[i].quantity);
    }

    return totalResult;
}