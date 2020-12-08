import {ADD_ORDER,FETCH_ORDERS} from '../actions/ordersActions';
import Orders from '../../modals/orders';

const initState = {
    orders: []
};

const ordersReducer = (state = initState,action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Orders(action.payload.id,action.payload.items,action.payload.date,action.payload.totalAmount,action.payload.shipAddress,action.payload.deliveryDate);
            return {...state, orders: state.orders.concat(newOrder)};
        case FETCH_ORDERS:
            return {...state,orders: action.payload};
        default: return state;
    }
};

export default ordersReducer;