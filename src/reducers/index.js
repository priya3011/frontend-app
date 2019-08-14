import { combineReducers } from 'redux';
import { default as UserStore } from './userReducer';
import investmentReducer from './investmentReducer';

const appReducer = combineReducers({
  UserStore,
  investment:investmentReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
