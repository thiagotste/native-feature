import { ADD_PLACE, SET_PLACES } from "../action/PlacesAction";
import Place from "../../models/place";

const initialsState = {
    places: []
}

const placesReducer = (state = initialsState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(action.placeData.id.toString(),
            action.placeData.title, action.placeData.img);
            
            return {
                places: state.places.concat(newPlace)
            }
        case SET_PLACES: 
            return {
                ...state,
                places: action.places.map(place => {
                    return new Place(place.id.toString(), place.title, place.imageUri);
                })
            }

        default:
            return state;
    }
}

export default placesReducer;