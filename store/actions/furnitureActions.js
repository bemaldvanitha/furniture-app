import axios from 'axios';

import Furniture from '../../modals/furniture';
import ItemOrder from '../../modals/itemOrder'

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const REDUCE_PRODUCT_QUANTITY = 'REDUCE_PRODUCT_QUANTITY';
export const ADD_ORDERED_ITEM = 'ADD_ORDERED_ITEM';
export const FETCH_ORDERED_ITEMS = 'FETCH_ORDERED_ITEMS';
export const SHIP_ORDER = 'SHIP_ORDER';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_FAVORITE_PRODUCTS = 'FETCH_FAVORITE_PRODUCTS';
export const FETCH_ALL = 'FETCH_ALL';

export const fetchAll = () => {
  return (dispatch,getState) => {
      const userId = getState().auth.userId;
      axios.get('https://furnitureapp-1b2e7.firebaseio.com/furniture.json').then(res => {
          const resData = res.data;
          const loadedProducts = [];

          if(resData !== null) {
              for (const key in resData) {
                  loadedProducts.push(new Furniture(key, resData[key].uId, resData[key].catId, resData[key].title, resData[key].description, resData[key].price, resData[key].quantity
                      , resData[key].imageUrl, resData[key].rating, resData[key].manufacturer, resData[key].manufacturedDate, resData[key].color));
              }
          }

          axios.get(`https://furnitureapp-1b2e7.firebaseio.com/users/${userId}/favorite.json`).then(res => {
              const data = res.data;
              const favListIds = [];

              if(data !== null) {
                  for (const key in data) {
                      favListIds.push(key);
                  }
              }

              dispatch({
                  type: FETCH_ALL,
                  payload: {
                      furniture: loadedProducts,
                      favListIds: favListIds
                  }
              })

          });
      });
  }
};

export const toggleFavorite = (id,isInFav) => {
    //console.log(isInFav);
    if(isInFav){
        return (dispatch,getState) => {
            const token = getState().auth.token;
            const userId = getState().auth.userId;
            axios.delete(`https://furnitureapp-1b2e7.firebaseio.com/users/${userId}/favorite/${id}.json?auth=${token}`).then(res => {
                dispatch({
                    type: TOGGLE_FAVORITE,
                    payload: id
                });
            })
        }
    }else{
        return (dispatch,getState) => {
            const token = getState().auth.token;
            const userId = getState().auth.userId;
            axios.patch(`https://furnitureapp-1b2e7.firebaseio.com/users/${userId}/favorite/${id}.json?auth=${token}`,{
                productId: id
            }).then(res => {
                dispatch({
                    type: TOGGLE_FAVORITE,
                    payload: id
                });
            })
        }
    }
};

export const addProduct = (uId,catId,title,description,price,quantity,imageUrl,manufacturer,color) => {
    return (dispatch,getState) => {
        const token = getState().auth.token;
        const date = new Date().toISOString();
        axios.post(`https://furnitureapp-1b2e7.firebaseio.com/furniture.json?auth=${token}`,{
            uId: uId,
            catId: catId,
            title: title,
            description: description,
            price: parseInt(price),
            quantity: parseInt(quantity),
            imageUrl: imageUrl,
            manufacturer: manufacturer,
            color: color,
            rating: 0,
            manufacturedDate: date
        }).then(res => {
            const resData = res.data;

            dispatch({
                type: ADD_PRODUCT,
                payload: {
                    id: resData.name,
                    uId: uId,
                    catId: catId,
                    title: title,
                    description: description,
                    price: parseInt(price),
                    quantity: parseInt(quantity),
                    imageUrl: imageUrl,
                    manufacturer: manufacturer,
                    color: color,
                    rating: 0,
                    manufacturedDate: date
                }
            });
        });
    }
};

export const editProduct = (id,title,description,price,quantity,color,imageUrl) => {
    return (dispatch,getState) => {
        const token = getState().auth.token;
        axios.patch(`https://furnitureapp-1b2e7.firebaseio.com/furniture/${id}.json?auth=${token}`,{
            title: title,
            description: description,
            price: parseInt(price),
            quantity: parseInt(quantity),
            color: color
        }).then(res => {
            const resData = res.data;

            dispatch({
                type: EDIT_PRODUCT,
                payload: {
                    id: id,
                    title: title,
                    description: description,
                    price: parseInt(price),
                    quantity: parseInt(quantity),
                    imageUrl: imageUrl,
                    color: color
                }
            });

        });
    }
};

export const deleteProduct = (id) => {
    return (dispatch,getState) => {
        const token = getState().auth.token;
        axios.delete(`https://furnitureapp-1b2e7.firebaseio.com/furniture/${id}.json?auth=${token}`).then(res => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            });
        })
    }
};

export const reduceQuantity = (id,quantity) => {
    return{
        type: REDUCE_PRODUCT_QUANTITY,
        payload: {
            id: id,
            quantity: quantity
        }
    }
};

export const addOrderedList = (itemName,quantity,color,shipAddress,uId,orderedName,orderedDate,shippedDate) => {
    return (dispatch,getState) => {
        const token = getState().auth.token;
        axios.post(`https://furnitureapp-1b2e7.firebaseio.com/users/${uId}/ordered.json?auth=${token}`,{
            itemName: itemName,
            quantity: quantity,
            color: color,
            shipAddress: shipAddress,
            uId: uId,
            orderedName: orderedName,
            orderedDate: orderedDate,
            shippedDate: shippedDate
        }).then(res => {
            const resData = res.data;

            dispatch({
                type: ADD_ORDERED_ITEM,
                payload: {
                    id: resData.name,
                    itemName: itemName,
                    quantity: quantity,
                    color: color,
                    shipAddress: shipAddress,
                    uId: uId,
                    orderedName: orderedName,
                    orderedDate: orderedDate,
                    shippedDate: shippedDate
                }
            });
        });
    }
};

export const fetchOrdered = (id) => {
  return (dispatch) => {
    axios.get(`https://furnitureapp-1b2e7.firebaseio.com/users/${id}/ordered.json`).then(res => {
        const resData = res.data;
        const orderedItems = [];

        if(resData !== null){
            for (const key in resData){
                const ordered = new ItemOrder(key,resData[key].itemName,resData[key].quantity,resData[key].color,resData[key].shipAddress,resData[key].uId,
                    resData[key].orderedName,resData[key].orderedDate,resData[key].shippedDate);
                orderedItems.push(ordered);
            }
        }

        dispatch({
            type: FETCH_ORDERED_ITEMS,
            payload: orderedItems
        });
    })
  }
};

export const shipOrder = (id,uId) => {
  return (dispatch,getState) => {
      const token = getState().auth.token;
      axios.patch(`https://furnitureapp-1b2e7.firebaseio.com/users/${uId}/ordered/${id}.json?auth=${token}`,{
          'shippedDate': new Date().toISOString(),
      }).then(res => {

          dispatch({
              type: SHIP_ORDER,
              payload: id
          });
      })
  }
};