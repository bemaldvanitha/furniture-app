import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import * as firebase from 'firebase';

import MainNavigator from './navigation/Navigator';
import furnitureReducer from './store/reducers/furnitureReducer';
import cartReducer from './store/reducers/cartReducer';
import ordersReducer from "./store/reducers/ordersReducers";
import userReducer from "./store/reducers/userReducer";
import authReducer from "./store/reducers/authReducer";

var firebaseConfig = {
  apiKey: "AIzaSyBrLBVVfFvnOlgV3Mr6tyqdAr9rA5uu5cI",
  authDomain: "furnitureapp-1b2e7.firebaseapp.com",
  databaseURL: "https://furnitureapp-1b2e7.firebaseio.com",
  projectId: "furnitureapp-1b2e7",
  storageBucket: "furnitureapp-1b2e7.appspot.com",
  messagingSenderId: "820624884103",
  appId: "1:820624884103:web:5610f8e0f7d94ba7a09322",
  measurementId: "G-K04RLBRNL4"
};

firebase.initializeApp(firebaseConfig);

/*if (!firebase.apps.length) {
  firebase.initializeApp({});
}*/

const rootReducer = combineReducers({
  furniture: furnitureReducer,
  cart: cartReducer,
  order: ordersReducer,
  user: userReducer,
  auth: authReducer,
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
    'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
    'chilanka': require('./assets/fonts/Chilanka-Regular.ttf'),
    'sansita-swashed': require('./assets/fonts/SansitaSwashed-VariableFont_wght.ttf')
  });
};

export default function App() {
  const [isLoaded,setIsLoaded] = useState(false);
  if(!isLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => {setIsLoaded(true)}}/>
  }
  return (
      <Provider store={store}>
        <MainNavigator/>
      </Provider>
  );
}
