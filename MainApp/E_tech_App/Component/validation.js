export const isValidEmail = (stringEmail) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail) || /^\d{10}$/.test(stringEmail)){
        return true;
    }
    return false;
};
export const isValidUsername = (stringUsername) => {
    return (/^[a-zA-Z]{4,}(?: [a-zA-Z]+){1,3}$/u.test(stringUsername));
};
export const isPassWord = (PassWord) => PassWord.length >= 6;
export const isConfirm = (Confirm) => Confirm.length >=6;

