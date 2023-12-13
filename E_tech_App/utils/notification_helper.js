import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid } from 'react-native';
import { setDeviceToken } from '../session';

async function requestUserPermission() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    const authStatus = await messaging().requestPermission()
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
        console.log('Authorization status:', authStatus)
        getFcmToken()
    }
}


async function getFcmToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken")
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken()
            if (fcmToken) {
                setDeviceToken(fcmToken)
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        } catch (error) {
            console.log('function getFcmToken', error)
        }
    } else {
        console.log(fcmToken)
        setDeviceToken(fcmToken)
    }
}

const NotificationListenner = (setNotification) => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        )
    })

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                )
            }
        })
    messaging().onMessage(async remoteMessage => {
        setNotification(remoteMessage)
    })
}

export { requestUserPermission, NotificationListenner }