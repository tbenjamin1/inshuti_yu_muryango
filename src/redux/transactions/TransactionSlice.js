import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DashboardApi from "../../api/DashboardApi";
import axios from "axios";

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
export const fetchAsynClients = createAsyncThunk('tranx/fetchAsynClients', async (selectedRange) => {
    const response = await axios.get(`https://api.koipay.co/api/v1/mobile/client/total?startDate=${selectedRange[0]}&endDate=${selectedRange[1]}&page=1&limit=6`)
    return response.data;
})
export const fetchAsynRefree = createAsyncThunk('tranx/fetchAsynRefree', async (selectedRange) => {
    const response = await axios.get(`https://api.koipay.co/api/v1/referees/total?startDate=2023-03-09&endDate=2023-07-06&page=1&limit=6`)
    return response.data;
})
const savedUser = localStorage.getItem('user');

const initialState = {
    isLoading: false,
    transactionsList: [],
    mtnTransationList: [],
    airtelTransationList: [],
    startimesTransationList: [],
    clientList: [],
    refereeList: [],
    refereePaginatedList: [],
    paginatedClientList: [],
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
        [fetchAsyncTransaction.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynRefree.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsyncMtnTransaction.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsyncAirtelTransaction.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynStartimesTransaction.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynClients.pending]: (state) => {
            console.log("pending")
            state.isLoading = true;
        },
        [fetchAsynClients.fulfilled]: (state, { payload }) => {
            console.log("fulfilled")
            return { ...state, isLoading: false, clientList: payload };
        },
        [fetchAsynRefree.fulfilled]: (state, { payload }) => {
            return { ...state, isLoading: false, refereeList: payload };
        },
        [fetchAsyncTransaction.fulfilled]: (state, { payload }) => {
            return { ...state, isLoading: false, transactionsList: payload };
        },
        [fetchAsyncMtnTransaction.fulfilled]: (state, { payload }) => {
            return { ...state, isLoading: false, mtnTransationList: payload };
        },
        [fetchAsyncAirtelTransaction.fulfilled]: (state, { payload }) => {
            return { ...state, isLoading: false, airtelTransationList: payload };
        },
        [fetchAsynStartimesTransaction.fulfilled]: (state, { payload }) => {
            return { ...state, isLoading: false, startimesTransationList: payload };
        },
        [fetchAsynStartimesTransaction.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsyncAirtelTransaction.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsyncMtnTransaction.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsyncTransaction.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsynRefree.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsynClients.rejected]: (state) => {
            state.isLoading = false;
            console.log("rejected")
        },
    }
})

export const { addTransactions } = transactionsSlice.actions;
export const { setUser } = transactionsSlice.actions;
export const getAllTransaction = (state) => state.transactions.transactionsList;
export const getAllMTNTransaction = (state) => state.transactions.mtnTransationList;
export const getAllAirtelTransaction = (state) => state.transactions.airtelTransationList;
export const getAllClientsList = (state) => state.transactions.clientList;
export const getAllRefree = (state) => state.transactions.refereeList;
export const getAllstartimesTransaction = (state) => state.transactions.startimesTransationList;
export const getUser = (state) => state.transactions.user;
export default transactionsSlice.reducer;