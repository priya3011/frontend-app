import Axios from "axios";
import { BACKEND_API } from '../config/config';

/**
 * In dashboard page
 */
export const getOverviewTableData = (data)=>Axios.post(BACKEND_API + 'users/balance', data);
export const getBalanceHistory = (data)=>Axios.post(BACKEND_API + 'users/balance_history', data);
export const getTransactionHistory = (data)=>Axios.post(BACKEND_API + 'accounts/transaction_history', data);
