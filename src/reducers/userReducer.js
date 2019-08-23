import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    RESET
} from '../actions/types';

const initialState = {
    authenticated: false,
    username: '',
    ref_code: '',
    level:-1,
    error:''
};

export default function userReducer (state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case LOGIN_SUCCESS:
            let { username, ref_code, level } = action.payload;
            localStorage.setItem('username',username);
            localStorage.setItem('ref_code',ref_code);
            localStorage.setItem('user_level',level);
            newState = {...state, authenticated:true, username, ref_code, level}
            return newState;
        case LOGIN_FAILED:
            localStorage.removeItem('username');
            localStorage.removeItem('ref_code');
            localStorage.removeItem('user_level');
            newState = {...initialState, error:action.payload.message};
            return newState;
        case LOGOUT:
        case RESET:
            localStorage.removeItem('username');
            localStorage.removeItem('ref_code');
            localStorage.removeItem('user_level');
            return state;
        default:
            return state;
    }
}
