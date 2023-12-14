export function kiemTraTuGanNhau(text1, text2) {
    const chuoi1 = text1.toString().trim().toLowerCase()
    const chuoi2 = text2.toString().trim().toLowerCase()
    const chieuDaiChuoi1 = chuoi1.length
    const chieuDaiChuoi2 = chuoi2.length
    if ((chieuDaiChuoi1 > 2 && chieuDaiChuoi2 > 2) && (chuoi2.includes(chuoi1) || chuoi1.includes(chuoi2))) {
        return true

    }
    const arrChuoi1 = chuoi1.split(' ')
    const arrChuoi2 = chuoi2.split(' ')

    for (let i = 0; i < arrChuoi1.length - 1; i++) {
        for (let j = 0; j < arrChuoi2.length - 1; j++) {
            if (arrChuoi1[i] === arrChuoi2[j] && arrChuoi1[i + 1] === arrChuoi2[j + 1]) {
                return true
            }
        }
    }
    return false
}

export function tinhDoTuongDong(text1, text2) {
    const chuoi1 = text1.toString().trim().toLowerCase()
    const chuoi2 = text2.toString().trim().toLowerCase()
    const chieuDaiChuoi1 = chuoi1.length
    const chieuDaiChuoi2 = chuoi2.length
    if ((chieuDaiChuoi1 > 2 && chieuDaiChuoi2 > 2) && (chuoi2.includes(chuoi1) || chuoi1.includes(chuoi2))) {
        return true
    }
    let countGiongNhau = 0

    for (let i = 0; i < chieuDaiChuoi1; i++) {
        if (chuoi2.includes(chuoi1[i])) {
            countGiongNhau++
        }
    }

    const phanTramTuongDong = (countGiongNhau / Math.max(chieuDaiChuoi1, chieuDaiChuoi2)) * 100
    return phanTramTuongDong >= 95
}