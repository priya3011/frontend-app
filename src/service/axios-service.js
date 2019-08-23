import Axios from "axios";
import { BACKEND_API, FRONTEND_API } from '../config/config';

/**
 * In dashboard page
 */
export const getOverviewTableData = (data)=>Axios.post(BACKEND_API + 'users/balance', data);
export const getBalanceHistory = (data)=>Axios.post(BACKEND_API + 'users/balance_history', data);
export const getTransactionHistory = (data)=>Axios.post(BACKEND_API + 'accounts/transaction_history', data);
export const getInvestments  = (data) => Axios.post(FRONTEND_API + 'all_investments', data);
export const transferAmount = (data) => Axios.post(BACKEND_API + 'transactions/transfer', data);

export const inviteUser = (data) => Axios.post(FRONTEND_API + 'invite_user',data);

// export const 