import {ADD_USER,EDIT_USER,CHANGE_PROFILE_PIC,FETCH_USER} from '../actions/userActions';
import {Users} from '../../data/dummy-data';
import User from '../../modals/user';

const initState = {
    users: Users
};

const userReducer = (state = initState,action) => {
    switch (action.type) {
        case EDIT_USER:
            const index = state.users.findIndex(user => user.id === action.payload.id);
            const user = new User(action.payload.id,action.payload.name,action.payload.email,action.payload.number,action.payload.address,action.payload.imageUrl,action.payload.isDealer,action.payload.storedLoc);
            const updatedUsers = [...state.users];
            updatedUsers[index] = user;
            return {...state, users: updatedUsers};
        case ADD_USER:
            const newUser = new User(action.payload.id,action.payload.name,action.payload.email,action.payload.number,action.payload.address,action.payload.imageUrl,action.payload.isDealer,action.payload.storedLoc);
            return {...state,users: state.users.concat(newUser)};
        case FETCH_USER:
            return {...state,users: state.users.concat(action.payload)};
        case CHANGE_PROFILE_PIC:
            const curIndex = state.users.findIndex(user => user.id === action.payload.id);
            const curUser = state.users.find(user => user.id === action.payload.id);

            curUser.imageUrl = action.payload.imageUrl;

            const updateUser = [...state.users];
            updateUser[curIndex] = curUser;
            return {...state,users: updateUser};
        default: return state;
    }
};

export default userReducer;
