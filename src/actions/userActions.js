import axios from "axios";
import { FRONTEND_API  } from '../config/config';
import  {  LOGIN_SUCCESS, LOGIN_FAILED,  LOGOUT, RESET } from '../actions/types';

// export const fetchToken  = (payload) => ({
//       type: FETCH_TOKEN,
//       payload
// });
//
// export const logoutUser = () => ({
//     type: LOGOUT
// });
//
// export const clearStore = () => ({
//     type: RESET
// });

export function reset(){
  return function (dispatch){
    dispatch({ type:RESET })
  }
}

export function logout(){
  return function (dispatch){
    dispatch({ type:LOGOUT })
  }
}

export function login(username, password){
  return function (dispatch){
    axios
    .post(FRONTEND_API+'login', { username, password })
    .then((res)=>{

      if (res.data.code === "Login successful"){

          dispatch({ type:LOGIN_SUCCESS, payload: {...res.data, username}})

      }
      else{
          dispatch({ type:LOGIN_FAILED , payload:{message:'Unable to Sign In, please try again later'}})
      }

    })
    .catch((err)=>{
      let msg = "";
      if(err.response.data.code)
        msg = `${err.response.data.code}: ${err.response.data.error}.`;
      else msg = `${err.response.data.msg}: ${err.response.data.err}.`;

        dispatch({ type:LOGIN_FAILED, payload: {message:msg}})

    });
  } // end return dispatch
}
