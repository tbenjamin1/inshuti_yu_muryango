import {configureStore} from "@reduxjs/toolkit";
import transactionReducer from "./transactions/TransactionSlice";


export const store = configureStore({
    reducer:{ transactions:transactionReducer},
})