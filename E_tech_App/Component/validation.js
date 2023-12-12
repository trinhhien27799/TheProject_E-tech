export const isValidEmail = (stringEmail) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail) || /^\d{10}$/.test(stringEmail)){
        return true;
    }
    return false;
};
export const isValidUsername = (stringUsername) => {
    return /^[a-zA-ZÀ-Ỹà-ỹẠ-Ỵạ-ỵẢ-Ỷả-ỷĂ-Ắă-ằẰ-Ỳằ-ỳẮ-Ỷắ-ỷÂ-Ấâ-ấẦ-Ỳầ-ỳẤ-Ỵầ-ỵẨ-Ỹẩ-ỹĨ-Ỷĩ-ỷĐđ0-9_\-]{3,20}(?: [a-zA-ZÀ-Ỹà-ỹẠ-Ỵạ-ỵẢ-Ỷả-ỷĂ-Ắă-ằẰ-Ỳằ-ỳẮ-Ỷắ-ỷÂ-Ấâ-ấẦ-Ỳầ-ỳẤ-Ỵầ-ỵẨ-Ỹẩ-ỹĨ-Ỷĩ-ỷĐđ0-9_\-]{3,20}){1,5}$/.test(stringUsername);
};
export const isPassWord = (PassWord) => PassWord.length >= 6;
export const isConfirm = (Confirm) => Confirm.length >=6;

