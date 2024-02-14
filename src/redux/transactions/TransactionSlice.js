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
export const fetchAsynParkCatgories = createAsyncThunk('tranx/fetchAsyncategories', async () => {
    const response = await axios.get(`https://api.koipay.co/api/v1/park-pick/categories`)
    return response.data.categories;
})
export const fetchAsynParkUnit = createAsyncThunk('tranx/fetchAsynUnit', async () => {
    const response = await axios.get(`https://api.koipay.co/api/v1/park-pick/units/get-all`)
    return response.data.units;
})
export const fetchAsynItems = createAsyncThunk('tranx/fetchAsynItems', async (currentPage) => {
    const response = await axios.get(`https://api.koipay.co/api/v1/park-pick/items/get-all?page=${currentPage}`)
    return response.data;
})

export const fetchAsynNonPaginatedItems = createAsyncThunk('tranx/NonPaginatedItems', async () => {
    const response = await axios.get(`https://api.koipay.co/api/v1/park-pick/items/get-items`)
    return response.data;
})

export const fetchAsynBoughtItems = createAsyncThunk('tranx/fetchAsynBoughtItems', async ({ pageboughtItems, selectedRange, filterStatus, filterItem }) => {
    const response = await axios.get(`https://api.koipay.co/api/v1/park-pick/bought-items/get-all?page=${pageboughtItems}&itemId=${filterItem ? filterItem : ''}&startDate=${selectedRange[0]}&endDate=${selectedRange[1]}&status=${filterStatus}`)
    return response.data;
})

export const fetchAsynBusinessRegistered = createAsyncThunk('tranx/fetchAsynBusinessRegistered', async ({ selectedRange, currentPage }) => {
    const response = await axios.get(`https://apidev2.koipay.co/api/business/?page=${currentPage}`)
    return response.data;

})


export const fetchAsynBusinessCatgeory = createAsyncThunk('tranx/fetchAsynBusinessCatgeory', async () => {
    const response = await axios.get(`https://apidev2.koipay.co/api/categories/`)
    return response.data;
})

export const fetchAsynSingleBusiness = createAsyncThunk('tranx/fetchAsynSingleBusiness', async ({ user }) => {
    const response = await axios.get(`https://apidev2.koipay.co/api/business/${user.id}/`)
    return response.data;
})
export const fetchAsynBusinessTransactionList = createAsyncThunk('tranx/fetchAsynBusinessTransactionList', async ({ user }) => {
    const response = await axios.get(`https://apidev2.koipay.co/api/business/transactions/${user.id}`)
    return response.data;
})
export const fetchAsynBusinessReport = createAsyncThunk('tranx/fetchAsynBusinessReport', async ({ user }) => {
    const response = await axios.get(`https://apidev2.koipay.co/api/business/statistics/${user.id}`)
    return response.data;
})

export const fetchAsynBusinessTopClientsReport = createAsyncThunk('tranx/fetchAsynBusinessTopClientsReport', async ({ user }) => {
    console.log("response",user)
    const response = await axios.get(`https://apidev2.koipay.co/api/business/top-clients/${user.id}`)
    
    return response.data;
})


const savedUser = localStorage.getItem('user');
// console.log("savedUser",savedUser)

const initialState = {
    isLoading: false,
    acceptTerms: false,
    transactionsList: [],
    mtnTransationList: [],
    airtelTransationList: [],
    startimesTransationList: [],
    clientList: [],
    refereeList: [],
    refereePaginatedList: [],
    paginatedClientList: [],
    parkCategories: [],
    paginatedParkCategories: [],
    parkUnitList: [],
    parkBoughtItemsList: [],
    nonPaginatedItemsList: [],
    paginatedBoughtItemsList: [],
    parkPicktItemsList: [],
    parkPicktpaginatedItems: [],

    BusinessList: [],
    paginatedBusinessList: [],
    businessCatgeoryList: [],

    singleBusiness: {},
    businessTransactionList: [],
    businessReport: {},
    businessTopClientsReport: null,
    isLoggedIn: savedUser ? true : false,
    user: savedUser ? JSON.parse(savedUser) : null,
};
const transactionsSlice = createSlice({
    name: "transactions",
    initialState,

    reducers: {
        setAcceptTermsConditions: (state, action) => {
            state.acceptTerms = action.payload;
        },
        addTransactions: (state, action) => {
            state.transactionsList = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: {
        [fetchAsynBusinessTransactionList.pending]: (state) => {

            state.isLoading = true;
        },
        [fetchAsynBusinessReport.pending]: (state) => {

            state.isLoading = true;
        },

        [fetchAsynBusinessTopClientsReport.pending]: (state) => {

            state.isLoading = true;
        },


        [fetchAsynSingleBusiness.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynBusinessCatgeory.pending]: (state) => {
            state.isLoading = true;
        },

        [fetchAsynBusinessRegistered.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynNonPaginatedItems.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynBoughtItems.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynItems.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynParkUnit.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAsynParkCatgories.pending]: (state) => {
            state.isLoading = true;
        },

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

            state.isLoading = true;
        },



        [fetchAsynBusinessTopClientsReport.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, businessTopClientsReport: payload
            };
        },
        [fetchAsynBusinessReport.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, businessReport: payload
            };
        },

        [fetchAsynBusinessTransactionList.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, businessTransactionList: payload.results
            };
        },

        [fetchAsynSingleBusiness.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, singleBusiness: payload
            };
        },

        [fetchAsynBusinessCatgeory.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, businessCatgeoryList: payload.results
            };
        },

        [fetchAsynBusinessRegistered.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, BusinessList: payload.results, paginatedBusinessList: payload

            };
        },

        [fetchAsynNonPaginatedItems.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, nonPaginatedItemsList: payload.items
            };
        },
        [fetchAsynBoughtItems.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, paginatedBoughtItemsList: payload, parkBoughtItemsList: payload.boughtItems
            };
        },
        [fetchAsynItems.fulfilled]: (state, { payload }) => {
            return {
                ...state, isLoading: false, parkPicktpaginatedItems: payload, parkPicktItemsList: payload.items
            };
        },
        [fetchAsynParkUnit.fulfilled]: (state, { payload }) => {
            return { ...state, isLoading: false, parkUnitList: payload };
        },
        [fetchAsynParkCatgories.fulfilled]: (state, { payload }) => {
            return { ...state, isLoading: false, parkCategories: payload };
        },
        [fetchAsynClients.fulfilled]: (state, { payload }) => {

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

        [fetchAsynBusinessTopClientsReport.rejected]: (state) => {
            state.isLoading = false;
        },

        [fetchAsynBusinessReport.rejected]: (state) => {
            state.isLoading = false;
        },

        [fetchAsynBusinessTransactionList.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsynSingleBusiness.rejected]: (state) => {
            state.isLoading = false;
        },

        [fetchAsynBusinessCatgeory.rejected]: (state) => {
            state.isLoading = false;
        },

        [fetchAsynBusinessRegistered.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsynNonPaginatedItems.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsynBoughtItems.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsynItems.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsynParkUnit.rejected]: (state) => {
            state.isLoading = false;
        },
        [fetchAsynParkCatgories.rejected]: (state) => {
            state.isLoading = false;
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

export const loggedInStatus = (state) => state.transactions.isLoggedIn;

export const getAllparkCategories = (state) => state.transactions.parkCategories;
export const getAllparkUnitList = (state) => state.transactions.parkUnitList;

export const getAllparkPickItemsList = (state) => state.transactions.parkPicktItemsList;

export const getAllparkPickBoughtItemsList = (state) => state.transactions.parkBoughtItemsList;
export const getAllparkPickPaginatedBoughtItemsList = (state) => state.transactions.paginatedBoughtItemsList;

export const getAllNonPaginatedItems = (state) => state.transactions.nonPaginatedItemsList;
export const getAllBussinessesRegistered = (state) => state.transactions.BusinessList;
export const getAllBussinessesCategories = (state) => state.transactions.businessCatgeoryList;
export const getAllPaginatedBussinesses = (state) => state.transactions.paginatedBusinessList;

export const getsingleBussiness = (state) => state.transactions.singleBusiness;
export const getAllfetchAsynBusinessTransactionList = (state) => state.transactions.businessTransactionList;
export const getAllBusinessReport = (state) => state.transactions.businessReport;
export const getAllTopBusinessReport = (state) => state.transactions.businessTopClientsReport;

export const getAllparkPickPaginatedItems = (state) => state.transactions.parkPicktpaginatedItems;

export const selectAcceptTerms = (state) => state.transactions.acceptTerms;
export const { setAcceptTermsConditions } = transactionsSlice.actions;
export default transactionsSlice.reducer;