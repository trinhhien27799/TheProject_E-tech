- Yêu cầu JDK phiên bản cũ recommend JDK 11.
- thêm file local.properties.
- sửa file node_modules/momo-sdk/build.gradle.
- Sửa file node_mudules/expo/AppEntry.js như sau:
-   import registerRootComponent from 'expo/build/launch/registerRootComponent';
    import messaging from '@react-native-firebase/messaging';
    import App from '../../App';
    import { navigate } from '../../navigation/NavigationService';

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        try {
            console.log('Message handled in the background!', remoteMessage);
            navigate(remoteMessage.data.route,remoteMessage.data.dataId)
        } catch (error) {
            console.log('registerRootComponent', error)
        }
    });


registerRootComponent(App);
