import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getDistance } from 'geolib';
import tailwind from 'twrnc';

const MapViewScreen = ({ currentLocation }) => {
    const place = currentLocation;
    const position1 = { latitude: 21.066533129695582, longitude: 105.80969312362204 };
    const position2 = { latitude: 21.07326088000975, longitude: 105.81827619193756 };

    const distance = getDistance(position1, position2);

    // Get the distance
    // console.log('Distance:', distance/1000);

    // const demoPositionArray = [
    //     { id: 1, title: 'Marker 1', coordinate: { latitude: 21.066533129695582, longitude: 105.80969312362204 } },
    //     { id: 2, title: 'Marker 2', coordinate: { latitude: 21.07326088000975, longitude: 105.81827619193756 } },
    // ];

    return (
        <View style={tailwind``}>
            {currentLocation &&
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0,
                        longitudeDelta: 0
                    }}
                    provider={PROVIDER_GOOGLE}
                >

                <Marker coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude
                }}/>
                </MapView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapViewScreen