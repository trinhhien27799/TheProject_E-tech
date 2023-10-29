import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DialogAddress from '../Component/DialogAddress'
import { Button, Dialog, Portal, Provider } from 'react-native-paper'
import tailwind from 'twrnc'

const AddressTest = () => {
    const [visible, setVisible] = useState(false);
    return (
        <Provider>
            <View style={tailwind `flex-1 justify-center`}>
                <Button onPress={() => {
                    setVisible(!visible)
                }}>
                    Address
                </Button>

                <Portal>
                    <Dialog visible={visible} onDismiss={() => setVisible(!visible)}>
                        <Dialog.Content>
                            <DialogAddress/>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    )
}

export default AddressTest