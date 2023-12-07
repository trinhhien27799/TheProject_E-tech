import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from "react-native"
import { getProvinces, getDistricts, getWards, addAddress, getAllInfoByQuery, editAddress } from "../../CallApi/AddressAPI"
import { useEffect, useState } from "react"
import LoadingWidget from "../../Component/loading"
import { useRoute } from "@react-navigation/native"

const NewAddress = () => {
    const route = useRoute()
    var addressDefault = route.params.address ?? null

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [province, setProvince] = useState(null)
    const [district, setDistrict] = useState(null)
    const [ward, setWard] = useState(null)

    const [loadingP, setLoadingP] = useState(false)
    const [loadingD, setLoadingD] = useState(false)
    const [loadingW, setLoadingW] = useState(false)

    const [fullname, setFullname] = useState(null)
    const [numberphone, setNumberphone] = useState(null)
    const [address, setAddress] = useState(null)

    const [warningFullname, setWarningFullname] = useState(null)
    const [warningNumberPhone, setWarningNumberPhone] = useState(null)
    const [warningAddress, setWarningAddress] = useState(null)

    const [loading, setLoading] = useState(false)

    const getListProvince = async () => {
        try {
            setLoadingP(true)
            const response = await getProvinces()
            setProvinces(response)
        } catch (error) {
            console.log('getListProvince: ', error);
        } finally {
            setLoadingP(false)
        }
    }


    const getListDistrict = async (code) => {
        try {
            setLoadingD(true)
            const response = await getDistricts(code)
            setDistricts(response)
        } catch (error) {
            console.log('getListDistrict: ', error);
        } finally {
            setLoadingD(false)
        }
    }


    const getListWard = async (code) => {
        try {
            setLoadingW(true)
            const response = await getWards(code)
            setWards(response)
        } catch (error) {
            console.log('getListWard: ', error);
        } finally {
            setLoadingW(false)
        }
    }

    const getListInfo = async () => {
        try {
            if (addressDefault != null) {
                const a = addressDefault.address.lastIndexOf(',')
                const b = addressDefault.address.lastIndexOf(',', a - 1)
                const c = addressDefault.address.lastIndexOf(',', b - 1)
                const add = addressDefault.address.slice(0, c).trim()
                const query = addressDefault.address.slice(c + 1).replaceAll('.', '').trim()
                const response = await getAllInfoByQuery(query)
                if (response.code == 200) {
                    setFullname(addressDefault.fullname)
                    setNumberphone(addressDefault.numberphone)
                    setAddress(add)
                    setProvince(response.data.province)
                    setDistrict(response.data.district)
                    setWard(response.data.ward)
                    getListDistrict(response.data.province.code)
                    getListWard(response.data.district.code)
                    setWarningFullname(false)
                    setWarningNumberPhone(false)
                    setWarningAddress(false)
                }
            }
        } catch (error) {
            console.log('Info: ', error)
        }
    }

    useEffect(() => {
        setProvince(null)
        getListProvince()
        getListInfo()
    }, [])

    const chooseProvince = (item) => {
        if (item != province) {
            setProvince(item)
            setDistrict(null)
            setWard(null)
            setDistricts([])
            setWards([])
            getListDistrict(item.code)
        } else {
            setProvince(null)
        }
    }
    const chooseDistrict = (item) => {
        if (item != district) {
            setDistrict(item)
            setWard(null)
            setWards([])
            getListWard(item.code)
        } else {
            setDistrict(null)
        }
    }
    const chooseWard = (item) => {
        if (item != ward) {
            setWard(item)
        } else {
            setWard(null)
        }
    }

    const onChangeTextFullname = (text) => {
        const newText = text.toString().replaceAll('  ', ' ')
        const regex = /^[^\d]+$/
        const check = regex.test(newText)
        setWarningFullname(!check)
        setFullname(newText)
    }

    const onChangeTextNumberphone = (text) => {
        const newText = text.toString().trim().replaceAll('  ', '')
        const regex = /^(0[2-9]|84[2-9]|\\+84[2-9]|00842[2-9])[0-9]{8}$/
        const check = regex.test(newText)
        setWarningNumberPhone(!check)
        setNumberphone(newText)
    }

    const onChangeTextAddress = (text) => {
        const newText = text.toString().replaceAll('  ', ' ')
        const check = newText.trim().length > 0
        setWarningAddress(!check)
        setAddress(newText)
    }


    const addNewAddress = async () => {
        try {
            setLoading(true)
            const name = fullname.trim()
            const phone = numberphone.trim()
            const add = address.toString().trim().replaceAll('  ', ' ') + ', ' + ward.path_with_type + '.'
            var response
            if (addressDefault == null) {
                response = await addAddress(name, phone, add)
            } else {
                response = await editAddress(addressDefault._id, name, phone, add)
            }
            if (response.code == 200) {
                alert("Cập nhật thành công")
            } else {
                alert("Đã xảy ra lỗi")
            }
        } catch (error) {
            console.log('Add Address: ', error)
            alert("Đã xảy ra lỗi")
        } finally {
            setLoading(false)
            setFullname(null)
            setNumberphone(null)
            setAddress(null)
            setProvince(null)
            setDistrict(null)
            setWard(null)
            setWarningFullname(null)
            setWarningNumberPhone(null)
            setWarningAddress(null)

        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title} >Họ tên người nhận:</Text>
            <TextInput
                inputMode="text"
                value={fullname}
                style={[styles.item, { borderWidth: warningFullname ? 2 : 0 }]}
                placeholder="Vui lòng không để trống"
                onChangeText={(text) => onChangeTextFullname(text)}
            />
            {warningFullname ? <Text style={styles.warning}>Vui lòng nhập đúng họ tên người nhận!</Text> : null}
            <Text style={styles.title} >Số điện thoại liên hệ:</Text>
            <TextInput
                inputMode="tel"
                value={numberphone}
                style={[styles.item, { borderWidth: warningNumberPhone ? 2 : 0 }]}
                placeholder="Vui lòng không để trống"
                onChangeText={(text) => onChangeTextNumberphone(text)}
            />
            {warningNumberPhone ? <Text style={styles.warning}>Vui lòng nhập đúng số điện thoại người nhận!</Text> : null}
            <Text style={styles.title} >Chọn tỉnh/thành phố:</Text>
            {loadingP ? <LoadingWidget /> :
                <FlatList
                    data={provinces}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => (
                        (province == null ?
                            <TouchableOpacity
                                onPress={() => { chooseProvince(item) }}>
                                <Text style={styles.item}>{item.name}</Text>
                            </TouchableOpacity>
                            :
                            item.code == province.code ?
                                <TouchableOpacity
                                    onPress={() => { chooseProvince(item) }}>
                                    <Text style={styles.item}>{item.name}</Text>
                                </TouchableOpacity>
                                : null)
                    )}
                />}
            {loadingD ? <LoadingWidget /> :
                (districts.length > 0 &&
                    <>
                        <Text style={styles.title} >Chọn quận/huyện:</Text>

                        <FlatList
                            data={districts}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => (
                                (district == null ?
                                    <TouchableOpacity
                                        onPress={() => { chooseDistrict(item) }}>
                                        <Text style={styles.item}>{item.name}</Text>
                                    </TouchableOpacity>
                                    : item.code == district.code ?
                                        <TouchableOpacity
                                            onPress={() => { chooseDistrict(item) }}>
                                            <Text style={styles.item}>{item.name}</Text>
                                        </TouchableOpacity>
                                        : null
                                )
                            )}
                        />
                    </>)
            }
            {loadingW ? <LoadingWidget /> :
                (wards.length > 0 &&
                    <>
                        <Text style={styles.title} >Chọn xã/phường:</Text>

                        <FlatList
                            data={wards}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => (
                                (ward == null ?
                                    <TouchableOpacity
                                        onPress={() => { chooseWard(item) }}>
                                        <Text style={styles.item}>{item.name}</Text>
                                    </TouchableOpacity>
                                    : ward.code == item.code ?
                                        <TouchableOpacity
                                            onPress={() => { chooseWard(item) }}>
                                            <Text style={styles.item}>{item.name}</Text>
                                        </TouchableOpacity>
                                        : null)
                            )}
                        />
                    </>)}
            {district &&
                <>
                    <Text style={styles.title} >Số nhà, tên đường, tên ngõ:</Text>
                    <TextInput
                        inputMode="text"
                        value={address}
                        style={[styles.item, { borderWidth: warningAddress ? 2 : 0 }]}
                        placeholder="Nhập chi tiết địa chỉ của bạn"
                        onChangeText={(text) => onChangeTextAddress(text)}
                    />
                    {warningAddress ? <Text style={styles.warning}>Vui lòng nhập chi tiết địa chỉ!</Text> : null}
                </>}
            <View style={{ height: 25, width: 0 }} />

            {(warningFullname == false && warningNumberPhone == false && warningAddress == false) ?
                (loading ? <LoadingWidget /> : <TouchableOpacity
                    onPress={addNewAddress}
                    style={styles.viewButton}>
                    <Text style={styles.textButton}>Xác nhận</Text>
                </TouchableOpacity>) : null}
        </View>
    )
}

export default NewAddress

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 18,
        padding: 10,
        backgroundColor: 'white',
        elevation: 5
    },
    item: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#e5e4ff',
        borderColor: 'red'
    },
    warning: { color: 'red', marginStart: 10 },
    viewButton: {
        width: '70%',
        paddingVertical: 15,
        backgroundColor: '#229fde',
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    }
})