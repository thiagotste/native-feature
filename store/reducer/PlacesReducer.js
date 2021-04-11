import { ADD_PLACE, SET_PLACES } from "../action/PlacesAction";
import Place from "../../models/place";

const initialsState = {
    places: []
}

const placesReducer = (state = initialsState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(action.placeData.id.toString(),
            action.placeData.title, action.placeData.img, action.placeData.address,
            action.placeData.coords.lat, action.placeData.coords.lgn);
            
            return {
                places: state.places.concat(newPlace)
            }
        case SET_PLACES:
            console.log(action.places)
            return {
                ...state,
                places: action.places.map(place => {
                    return new Place(place.id.toString(), place.title, place.imageUri, place.address,
                    place.lat, place.lng);
                })
            }

        default:
            return state;
    }
}

export default placesReducer;