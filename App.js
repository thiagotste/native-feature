import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import PlacesNavigation from "./navigation/PlacesNavigation";
import placesReducer from "./store/reducer/PlacesReducer";
import { init } from './helpers/db';

init().then(() => {
  console.log('Databese inicializado');
}).catch(err => {
  console.log('Falha ao inicializar database');
  console.log(err);
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  );
}