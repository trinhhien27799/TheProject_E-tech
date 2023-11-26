function formatPrice(price) {
    if (price != null && typeof price === 'number') {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
        // Xử lý khi giá trị không hợp lệ (undefined, null, hoặc không phải là số)
        return "Invalid Price";
    }
}

export {formatPrice}