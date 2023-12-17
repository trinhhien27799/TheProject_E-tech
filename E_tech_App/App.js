import React, { useEffect, useRef, useState } from 'react'

import { Image, Text, View } from 'react-native'

import { requestUserPermission, NotificationListenner } from './utils/notification_helper'
import SoundPlayer from './utils/notificationSound'
import { MainNavigator, navigate } from './navigation/NavigationService'



export default App = () => {
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    requestUserPermission()
    NotificationListenner(setNotification)
  }, [])


  useEffect(() => {
    if (notification) {
      try {
        SoundPlayer.playSound()
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (error) {
        console.log(error)
      }
    }
  }, [notification])




  return (
    <View style={{ flex: 1 }}>
      <MainNavigator />
      <NotificationView notification={notification} setNotification={setNotification} />
    </View>
  )
}


const NotificationView = ({ notification, setNotification }) => {


  const ClickNotification = (route, dataId) => {
    navigate(route, { dataId: dataId })
    setNotification(null)
  }


  return (
    notification &&
    <View
      onTouchStart={() => {
        ClickNotification(notification.data.route, notification.data.dataId)
      }}
      style={{
        backgroundColor: 'whitesmoke', padding: 10, marginHorizontal: 20, borderRadius: 14, elevation: 10, position: 'absolute',
        top: 85, width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center'
      }}>
      {notification.notification.android.imageUrl && <Image
        style={{ width: 40, height: 40, resizeMode: 'center', borderRadius: 8 }}
        source={{ uri: notification.notification.android.imageUrl }} />}
      <View style={{ marginStart: 8, flex: 1 }}>
        <Text>{notification.notification.title} </Text>
        <Text>{notification.notification.body}</Text>
      </View>
    </View>
  )
}

