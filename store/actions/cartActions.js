export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REMOVE_ALL = 'REMOVE_ALL';

export const addToCart = (quantity,color,price,proId) => {
  return{
      type: ADD_TO_CART,
      payload: {
          quantity: quantity,
          color: color,
          price: price,
          proId: proId
      }
  }
};

export const removeFromCart = (id) => {
    return{
        type: REMOVE_FROM_CART,
        payload: {
            id: id,
        }
    }
};

export const removeAllCart = () => {
    return{
        type: REMOVE_ALL,
    }
};