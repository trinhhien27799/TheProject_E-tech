function formatPrice(price) {
    console.log(price)
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function formatTime(time) {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (day + '/' + month + '/' + year + ' - ' + hours + ':' + minutes).toString();
    // return ('Vào lúc '+hours + ' giờ ' + minutes + ' phút - ngày ' + day + ', tháng ' + month + ', năm ' + year).toString();
}

export { formatPrice, formatTime }