import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlaceListScreen from '../screens/PlaceListScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';
import Colors from "../constants/Colors";

const PlaceListNavigator = createStackNavigator();

const PlacesNavigation = () => {
    return (
    <NavigationContainer>
        <PlaceListNavigator.Navigator screenOptions={PlaceListNavigatorStyle} initialRouteName="PlaceList">
            <PlaceListNavigator.Screen name="PlaceList" options={{ title: 'Lista de lugares' }} component={PlaceListScreen} />
            <PlaceListNavigator.Screen name="NewPlace" options={{ title: 'Adicionar lugares' }} component={NewPlaceScreen} />
            <PlaceListNavigator.Screen name="Map" options={{ title: 'Mostrar mapa' }} component={MapScreen} />
            <PlaceListNavigator.Screen name="PlaceDetail" options={({ route }) => ({ title: route.params.title })} component={PlaceDetailScreen} />
        </PlaceListNavigator.Navigator>
    </NavigationContainer>
    );
}

const PlaceListNavigatorStyle = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

export default PlacesNavigation;