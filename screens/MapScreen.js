import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';


const MapScreen = props => {
    const { initialLocation } = props.route.params || {};
    const { readonly } = props.route.params || false;
    const [selectedLocation, setSelectedLocation] = useState();
    const mapRegion = {
        latitude: initialLocation.lat ? initialLocation.lat : 37.78825,
        longitude: initialLocation.lgn ? initialLocation.lgn : -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = event => {
        if (readonly) {
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lgn: event.nativeEvent.coordinate.longitude
        });
    };

    let markerCoordinates;
    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lgn
        };
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            //pode mostrar um Alert
            return;
        }
        console.log(selectedLocation);
        props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation })
    }, [selectedLocation]);

    // useEffect(() => {
    //     props.navigation.setParams({saveLocation: savePickedLocationHandler});
    // }, []);

    useLayoutEffect(() => {
        if (!readonly) {
            props.navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity style={styles.headerButton} onPress={savePickedLocationHandler}>
                        <Text style={styles.headerButtonTxt}>
                            Salvar
                    </Text>
                    </TouchableOpacity>
                ),
            });
        }
    }, [props.navigation, savePickedLocationHandler, readonly]);

    return (
        <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
            { markerCoordinates && <Marker title="Localização selecionada" coordinate={markerCoordinates} />}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20,

    },
    headerButtonTxt: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});
export default MapScreen;