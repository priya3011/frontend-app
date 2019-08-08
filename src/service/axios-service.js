import Axios from "axios";
import { BACKEND_POST_GET_USER_BALANCE, 
         BACKEND_POST_TRANSACTION_HISTORY,
         BACKEND_POST_BALANCE_HISTORY } from './config';

/**
 * In dashboard page
 */
export const getOverviewTableData = (data)=>Axios.post(BACKEND_POST_GET_USER_BALANCE, data);
export const getBalanceHistory = (data)=>Axios.post(BACKEND_POST_BALANCE_HISTORY, data);
export const getTransactionHistory = (data)=>Axios.post(BACKEND_POST_TRANSACTION_HISTORY, data);


