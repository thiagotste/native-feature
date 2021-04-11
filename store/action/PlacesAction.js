import * as FileSystem from 'expo-file-system';
export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
import { insertPlace, fetchPlaces } from '../../helpers/db'
import ENV from '../../env';

export const addPlace = (title, img, location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lgn}&key=${ENV.googleApiKey}`);
        if (!response.ok) {
            throw new Error('Algo aconteceu!');
        }
        const resData = await response.json();
        if (!resData.results) {
            throw new Error('Algo aconteceu!');
        }
        const address = resData.results[0].formated_address;
        const fileName = img.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: img,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lgn);
            dispatch(
                {
                    type: ADD_PLACE,
                    placeData: { id: dbResult.insertId, title, img: newPath, address, coords: {
                        lat: location.lat,
                        lgn: location.lgn
                    }}
                }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}