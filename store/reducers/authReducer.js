import {SIGN_UP,SIGN_IN} from '../actions/authActions';

const initialState = {
    token: null,
    userId: null
};

const authReducer = (state = initialState , action) => {
    switch (action.type) {
        case SIGN_IN:
            return {token: action.payload.token,userId: action.payload.userId};
        case SIGN_UP:
            return {token: action.payload.token,userId: action.payload.userId};
        default: return state;
    }
};

export default authReducer;