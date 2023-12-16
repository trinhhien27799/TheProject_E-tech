import { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, Linking, Alert } from "react-native"


const ItemContact = ({ name }) => {


    const [image, setImage] = useState(null)
    const [text, setText] = useState('')

    const getItem = () => {
        switch (name) {
            case 'facebook': {
                setText('Liên hệ qua Facebook')
                setImage(require('../../assets/facebook.png'))
                break
            }
            case 'messenger': {
                setText('Liên hệ qua Messenger')
                setImage(require('../../assets/messenger.png'))
                break
            }
            case 'zalo': {
                setText('Liên hệ qua Zalo')
                setImage(require('../../assets/zalo.png'))
                break
            }
            case 'numberphone': {
                setText('Liên hệ qua số điện thoại')
                setImage(require('../../assets/phone-call.png'))
                break
            }
            case 'instagram': {
                setText('Liên hệ qua Instagram')
                setImage(require('../../assets/instagram.png'))
                break
            }

            default: break

        }
    }

    useEffect(() => {
        getItem()
    })

    const handleClick = (name) => {
        var url = ''
        switch (name) {
            case 'facebook': {
                url = 'https://www.facebook.com/profile.php?id=61553028538851'
                break
            }
            case 'messenger': {
                url = 'fb-messenger://user-thread/61553028538851'
                break
            }
            case 'zalo': {
                url = 'http://zaloapp.com/qr/p/1qfwx4ijwytjx'
                break
            }
            case 'numberphone': {
                url = 'tel:0963258741'
                break
            }
            case 'instagram': {
                url = ''
                break
            }

            default: break

        }

        if (url === '') {
            Alert.alert('Thông báo', 'Hãy thử một phương thức liên hệ khác')
            return
        }


        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.error("Không hỗ trợ url: " + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => {
                Alert.alert('Thông báo', 'Phương thức liên hệ này hiện không còn khả dụng')
            });
    }


    return (
        <TouchableOpacity
            onPress={() => handleClick(name)}
            style={styles.container}>
            {image && <Image source={image} style={styles.image} />}
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ItemContact
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 10,
        flexDirection: 'row',
        width: '80%',
        flexGrow: 0,
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10
    },
    image: {
        width: 50, height: 50,
    },
    text: {
        marginStart: 15,
        fontSize: 18
    }
})