import {FOLLOW, UNFOLLOW, GET_FRIENDS, GET_USERS} from "./actionCreater";

const initialState = {
    friends: [],
    users: []
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {...state, users: action.data}
        case GET_FRIENDS:
            return {...state, friends: action.data}
        case FOLLOW:
            return {...state, friends: [...state.friends, action.data]};
        case UNFOLLOW:
            let friends = state.friends.filter(val => val.friendId !== action.id);
            return {...state, friends};
        default:
            console.log(state.friends);
            return state;
    }
}