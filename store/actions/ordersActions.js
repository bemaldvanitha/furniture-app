import axios from 'axios';

import Orders from '../../modals/orders'

export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export const addOrder = (items,date,totalAmount,shipAddress,deliveryDate) => {
  return (dispatch,getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      axios.post(`https://furnitureapp-1b2e7.firebaseio.com/users/${userId}/orders.json?auth=${token}`,{
          items: items,
          date: date,
          totalAmount: totalAmount,
          shipAddress: shipAddress,
          deliveryDate: deliveryDate
      }).then(res => {
          const resData = res.data;

          dispatch({
              type: ADD_ORDER,
              payload: {
                  id: resData.name,
                  items: items,
                  date: date,
                  totalAmount: totalAmount,
                  shipAddress: shipAddress,
                  deliveryDate: deliveryDate,
              }
          });
      })
  }
};

export const fetchOrders = () => {
  return (dispatch,getState) => {
      const userId = getState().auth.userId;
      axios.get(`https://furnitureapp-1b2e7.firebaseio.com/users/${userId}/orders.json`).then(res => {
        const resData = res.data;
        const orders = [];

        if(resData !== null){
            for (const key in resData){
                const order = new Orders(key,resData[key].items,resData[key].date,resData[key].totalAmount,resData[key].shipAddress,resData[key].deliveryDate);
                orders.push(order);
            }
        }

        dispatch({
            type: FETCH_ORDERS,
            payload: orders,
        })
    })
  };
};