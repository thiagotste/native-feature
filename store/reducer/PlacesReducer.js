import { ADD_PLACE } from "../action/PlacesAction";
import Place from "../../models/place";

const initialsState = {
    places: []
}

const placesReducer = (state = initialsState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(new Date().toString(),
            action.placeData.title, action.placeData.img);
            
            return {
                places: state.places.concat(newPlace)
            }

        default:
            return state;
    }
}

export default placesReducer;