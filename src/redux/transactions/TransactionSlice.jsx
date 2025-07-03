import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchAsynBusinessRegistered = createAsyncThunk(
  "tranx/fetchAsynBusinessRegistered",
  async ({ selectedRange, currentPage }) => {
    const response = await axios.get(
      `${apiUrlApidev}/business/?page=${currentPage}`
    );
    return response.data;
  }
);

export const fetchAsynProviders = createAsyncThunk(
  "tranx/fetchAsynProviders",
  async () => {
    const response = await axios.get(
      `https://ussdbackendautomation.jalikoi.rw/providers`
    );
    return response.data;
  }
);

const savedUser = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  acceptTerms: false,
  transactionsList: [],

  BusinessList: [],
  paginatedBusinessList: [],

  paginatedBusinessTransaction: {},

  isLoggedIn: savedUser ? true : false,
  user: savedUser ? JSON.parse(savedUser) : null,

  // ussd
  allUssdProviders: null,
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
    [fetchAsynProviders.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchAsynBusinessRegistered.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchAsynProviders.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        allUssdProviders: payload,
      };
    },

    [fetchAsynBusinessRegistered.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        BusinessList: payload.results,
        paginatedBusinessList: payload,
      };
    },

    [fetchAsynProviders.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchAsynBusinessRegistered.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addTransactions } = transactionsSlice.actions;
export const { setUser } = transactionsSlice.actions;
//  export user
export const getUser = (state) => state.transactions.user;


export const loggedInStatus = (state) => state.transactions.isLoggedIn;

export const getAllBussinessesRegistered = (state) =>
  state.transactions.BusinessList;

export const getAllPaginatedBussinesses = (state) =>
  state.transactions.paginatedBusinessList;

export const getAllProviders = (state) => state.transactions.allUssdProviders;

export const selectAcceptTerms = (state) => state.transactions.acceptTerms;
export const { setAcceptTermsConditions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
