import * as FileSystem from 'expo-file-system';
export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
import { insertPlace, fetchPlaces } from '../../helpers/db'

export const addPlace = (title, img) => {
    return async dispatch => {
        const fileName = img.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: img,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, 'new adress', 15.6, 12.3);
            dispatch(
                {
                    type: ADD_PLACE,
                    placeData: { id: dbResult.insertId, title, img: newPath }
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