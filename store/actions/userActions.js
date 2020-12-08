import axios from 'axios';

import User from '../../modals/user';

export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const CHANGE_PROFILE_PIC = 'CHANGE_PROFILE_PIC';
export const FETCH_USER = '';

export const addUser = (name,email,number,address,imageUrl,isDealer) => {
    return async (dispatch,getState) => {
        try{
            const userId = getState().auth.userId;
            const token = getState().auth.token;
            const response = await axios.post(`https://furnitureapp-1b2e7.firebaseio.com/users/${userId}/detail.json?auth=${token}`,{
                name: name,
                email: email,
                number: number,
                address: address,
                imageUrl: imageUrl,
                isDealer: isDealer
            });

            const resData = response.data;

            dispatch({
                type: ADD_USER,
                payload: {
                    id: userId,
                    name: name,
                    email: email,
                    number: number,
                    address: address,
                    imageUrl: imageUrl,
                    isDealer: isDealer,
                    storedLoc: resData.name
                }
            });

        }catch (err) {
            throw err;
        }
    }
};

export const fetchCurrentUser = () => {
    return async (dispatch,getState) => {
        try{
            const userId = getState().auth.userId;
            const response = await axios.get(`https://furnitureapp-1b2e7.firebaseio.com/users/${userId}/detail.json`);
            const resData = response.data;
            const users = [];

            for(const key in resData){
                const user = new User(userId,resData[key].name,resData[key].email,resData[key].number,resData[key].address,resData[key].imageUrl,resData[key].isDealer,key);
                users.push(user);
            }

            dispatch({
                type: FETCH_USER,
                payload: users
            })

        }catch (err) {
            throw err;
        }
    }
};

export const changeUser = (id,name,email,number,address,imageUrl,isDealer,storedLoc) => {
  return (dispatch,getState) => {
      try{
          const userId = getState().auth.userId;
          const token = getState().auth.token;

          //console.log(storedLoc);
          //console.log(userId);

          const response = axios.patch(`https://furnitureapp-1b2e7.firebaseio.com/users/${userId}/detail/${storedLoc}.json?auth=${token}`,{
              name: name,
              email: email,
              number: number,
              address: address,
              isDealer: isDealer
          });

          dispatch({
              type: EDIT_USER,
              payload: {
                  id: id,
                  name: name,
                  email: email,
                  number: number,
                  address: address,
                  imageUrl: imageUrl,
                  isDealer: isDealer,
                  storedLoc: storedLoc
              }
          });
      }catch (err) {
          throw err;
      }
  }
};

export const changeProfilePic = (id,imageUrl) => {
    return{
        type: CHANGE_PROFILE_PIC,
        payload: {
            id: id,
            imageUrl: imageUrl,
        }
    }
};