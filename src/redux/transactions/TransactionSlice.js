import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DashboardApi from "../../api/DashboardApi";

export const fetchAsyncTransaction = createAsyncThunk('tranx/fetchAsyncElectricity', async (selectedRange) => {
    const response = await DashboardApi.get(`?service=96b33985-1045-437c-9415-ff8a248978db&startDate=${selectedRange[0]}&endDate=${selectedRange[1]}`)
    return response.data;
})
export const fetchAsyncMtnTransaction = createAsyncThunk('tranx/fetchAsyncMtnTransaction', async (selectedRange) => {
    const response = await DashboardApi.get(`?service=8686251a-dbad-4ac5-950c-b007d7d6edf6&startDate=${selectedRange[0]}&endDate=${selectedRange[1]}`)
    return response.data;
})
export const fetchAsyncAirtelTransaction = createAsyncThunk('tranx/fetchAsyncAirtelTransaction', async (selectedRange) => {
    const response = await DashboardApi.get(`?service=886801e5-2874-4dc8-9581-ed33e7203a56&startDate=${selectedRange[0]}&endDate=${selectedRange[1]}`)
    return response.data;
})
export const fetchAsynStartimesTransaction = createAsyncThunk('tranx/fetchAsynStartimesTransaction', async (selectedRange) => {
    const response = await DashboardApi.get(`?service=ca33d2a0-a283-4c91-a946-c49ed59b203e&startDate=${selectedRange[0]}&endDate=${selectedRange[1]}`)
    return response.data;
})

const savedUser = localStorage.getItem('user');

const initialState = {
    transactionsList: [],
    mtnTransationList: [],
    airtelTransationList: [],
    startimesTransationList: [],
    isLoggedIn: savedUser ? true : false,
    user: savedUser ? JSON.parse(savedUser) : null,

};
const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransactions: (state, action) => {
            state.transactionsList = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },

    },
    extraReducers: {
        [fetchAsyncTransaction.pending]: () => {
            console.log("pending")
        },
        [fetchAsyncTransaction.fulfilled]: (state, { payload }) => {
            console.log("fulfilled")
            return { ...state, transactionsList: payload };
        },
        [fetchAsyncMtnTransaction.fulfilled]: (state, { payload }) => {
            console.log("fulfilled mtn")
            return { ...state, mtnTransationList: payload };
        },
        [fetchAsyncAirtelTransaction.fulfilled]: (state, { payload }) => {
            console.log("fulfilled airtel")
            return { ...state, airtelTransationList: payload };
        },
        [fetchAsynStartimesTransaction.fulfilled]: (state, { payload }) => {
            console.log("fulfilled startimes")
            return { ...state, startimesTransationList: payload };
        },
        [fetchAsyncTransaction.rejected]: () => {
            console.log("rejected")
        }
    }
})

export const { addTransactions } = transactionsSlice.actions;
export const { setUser } = transactionsSlice.actions;
export const getAllTransaction = (state) => state.transactions.transactionsList;
export const getAllMTNTransaction = (state) => state.transactions.mtnTransationList;
export const getAllAirtelTransaction = (state) => state.transactions.airtelTransationList;
export const getAllstartimesTransaction = (state) => state.transactions.startimesTransationList;
export const getUser = (state) => state.transactions.user;
export default transactionsSlice.reducer;