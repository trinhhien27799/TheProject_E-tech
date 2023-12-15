export const isValidEmail = (stringEmail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail) || /^\d{10}$/.test(stringEmail)) {
        return true;
    }
    return false;
};
export const isValidUsername = (stringUsername) => {
    var vietnameseFullNamePattern = /^[^\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+(\s[^\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)*$/u;
    return vietnameseFullNamePattern.test(stringUsername);
};
export const isPassWord = (PassWord) => PassWord.length >= 6;
export const isConfirm = (Confirm) => Confirm.length >= 6;

