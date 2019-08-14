import { combineReducers } from 'redux';
import userReducer from './userReducer';
import investmentReducer from './investmentReducer';

const appReducer = combineReducers({
  user:userReducer,
  investment:investmentReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
