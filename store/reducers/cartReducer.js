import {ADD_TO_CART,REMOVE_FROM_CART,REMOVE_ALL} from '../actions/cartActions';
import CartItem from '../../modals/cartItem';

const initState = {
  cart: []
};

const cartReducer = (state = initState,action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const cartItemIndex = state.cart.findIndex(cartItem => cartItem.proId === action.payload.proId);
            if(cartItemIndex >= 0){
                const selectItem = state.cart[cartItemIndex];
                if(selectItem.color === action.payload.color){
                    const updatedCartItem = new CartItem(selectItem.id,selectItem.quantity + action.payload.quantity,selectItem.color,selectItem.price,selectItem.proId,new Date().toISOString());
                    const updatedCart = [...state.cart];
                    updatedCart.splice(cartItemIndex,1);
                    return {...state,cart: updatedCart.concat(updatedCartItem)}
                }else{
                    const cartItem = new CartItem(Math.random().toString(),action.payload.quantity,action.payload.color,action.payload.price,action.payload.proId,new Date().toISOString());
                    return {...state,cart: state.cart.concat(cartItem)}
                }
            }else{
               const cartItem = new CartItem(Math.random().toString(),action.payload.quantity,action.payload.color,action.payload.price,action.payload.proId,new Date().toISOString());
               return {...state,cart: state.cart.concat(cartItem)}
            }
        case REMOVE_FROM_CART:
            const cartIndex = state.cart.findIndex(cartItem => cartItem.id === action.payload.id);
            const itemQuantity = state.cart[cartIndex].quantity;
            if(itemQuantity === 1){
                const updatedCartItem = [...state.cart];
                updatedCartItem.splice(cartIndex,1);
                return {...state,cart: updatedCartItem}
            }else{
                const selectItem  = state.cart[cartIndex];
                const newItem = new CartItem(selectItem.id,selectItem.quantity - 1,selectItem.color,selectItem.price,selectItem.proId,selectItem.date);
                const updatedCartItem = [...state.cart];
                updatedCartItem.splice(cartIndex,1);
                return {...state,cart: updatedCartItem.concat(newItem)}
            }
        case REMOVE_ALL:
            return {...state,cart: []};
        default: return state;
    }
};

export default cartReducer;
