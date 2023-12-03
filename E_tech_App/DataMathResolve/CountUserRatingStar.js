export const CountUserRatingStar = (array, starNum) => {
    const sortArray = array.filter((item) => item.numStar == starNum);
    return sortArray.length;
}