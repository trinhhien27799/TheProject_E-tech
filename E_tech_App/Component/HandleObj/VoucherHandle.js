let value = null;

export const setHandleVoucher = (newValue) => {
    value = newValue;
};

export const getHandleVoucher = () => {
    console.log('voucher handle: ' + value)
    return value;
};