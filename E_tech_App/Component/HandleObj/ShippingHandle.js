let value = null;

export const setHandleShipping = (newValue) => {
    value = newValue;
};

export const getHandleShipping = () => {
    console.log('handle: ' + value)
    return value;
};