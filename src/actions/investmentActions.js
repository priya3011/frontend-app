import axios from "axios";
import { FETCH_ALL_INVESTMENTS , FETCH_USER_INVESTMENTS,  UNABLE_FETCH_DATA } from './types';
import { FRONTEND_API  } from '../config/config'

export function fetchAllInvestments()  {
    return function (dispatch){

        axios.post(FRONTEND_API+'all_investments')
        .then(response => dispatch({ type:FETCH_ALL_INVESTMENTS, payload: response.data.investments}))
        .catch(err =>{
          console.error(err);
          return dispatch({type:UNABLE_FETCH_DATA, message:err.message})

        });


    }
}


export function fetchUserInvestments(username){
  return function (dispatch){

    axios.post(FRONTEND_API+'all_investments',{username})
    .then(response => dispatch({ type:FETCH_USER_INVESTMENTS, payload: response.data.investments}))
    .catch(err =>{
      console.error(err);
      return dispatch({type:UNABLE_FETCH_DATA, message:err.message})

    });


}
}
