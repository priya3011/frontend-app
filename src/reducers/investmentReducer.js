import { FETCH_ALL_INVESTMENTS, FETCH_USER_INVESTMENTS } from '../actions/types';

const initialState = {
    all_investments:[],
    user_investments:[]
}

export default function(state = initialState, action){

    switch(action.type){
        case FETCH_ALL_INVESTMENTS:
            console.log('fetch all investment reducer: ',action);

            return {
                ...state,
                all_investments: action.payload
            };
        case FETCH_USER_INVESTMENTS:
            console.log('fetch user investment reducer: ',action);
    
                return {
                    ...state,
                    user_investments: action.payload
                };
        default:
            return state;

    }

}
