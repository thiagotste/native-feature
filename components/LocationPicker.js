import React, { useState } from 'react';
import {
    View, Button, Text,
    ActivityIndicator, Alert, StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const verifyPermisions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert('Insuficiente permissão',
                'Você precisa dar permissão para usar a localização.',
                [{ text: 'Okay' }]);
            return false;
        }
        return true;
    };
    const getLocationHandler = async () => {
        const hasPermission = await verifyPermisions();
        if (!hasPermission) {
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            setPickedLocation({
                lat:location.coords.altitude,
                lng: location.coords.longitude
            });
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            Alert.alert('Localização não encontrada.',
                'Tente de novo mais tarde ou pegue a localização do mapa',
                [{ text: 'Ok' }])
        }

    };
    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {isFetching ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    <Text>nenhuma localização selecionada!</Text>
                )}
            </MapPreview>
            <Button title="Obter localização do usuário"
                color={Colors.primary}
                onPress={getLocationHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default LocationPicker;