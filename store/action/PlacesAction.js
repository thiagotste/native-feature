export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, img)=> {
    return {type: ADD_PLACE, placeData: {title, img}}
}