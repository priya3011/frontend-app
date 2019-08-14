import { FETCH_ALL_INVESTMENTS } from '../actions/types';

const initialState = {
    all_investments:[]
}

export default function(state = initialState, action){

    switch(action.type){
        case FETCH_ALL_INVESTMENTS:
        console.log('fetch all investment reducer: ',action);

            return {
                ...state,
                all_investments: action.payload
            };
        default:
            return state;

    }

}
