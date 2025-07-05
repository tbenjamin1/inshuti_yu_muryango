import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const savedUser = localStorage.getItem("user");
const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

// get groups
export const fetchAsynGroups = createAsyncThunk(
  "tranx/fetchAsynGroups",
  async ({ currentPage, searchQuery, serviceId }) => {
    const response = await axios.get(`${API_BASE}/groups`, {
      headers: {
        Authorization: `Bearer ${savedUser?.token}`,
      },
    });
    return response.data;
  }
);

//  get products
export const fetchAsynProducts = createAsyncThunk(
  "tranx/fetchAsynProducts",
  async ({ currentPage, searchQuery, categoryId, groupId }) => {
    const response = await axios.get(`${API_BASE}/products/`, {
      headers: {
        Authorization: `Bearer ${savedUser?.token}`,
      },
    });
    return response.data;
  }
);
// fetchAsynServices
export const fetchAsynServices = createAsyncThunk(
  "tranx/fetchAsynServices",
  async ({ currentPage, searchQuery, categoryId, groupId }) => {
    const response = await axios.get(`${API_BASE}/services/`,{
      headers: {
        Authorization: `Bearer ${savedUser?.token}`,
      },
    });
    return response.data;
  }
);
//  get services
export const fetchAsynServicesPublic = createAsyncThunk(
  "tranx/fetchAsynServicesPublic",
  async ({ currentPage, searchQuery, categoryId, groupId }) => {
    const response = await axios.get(`${API_BASE}/services/`);
    return response.data;
  }
);

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
 
);

const initialState = {
  // groups
  groupsList: [],
  paginatedGroupsList: {},
  isLoadingGroups: false,

  // services
  servicesList: [],
  paginatedServicesList: {},
  isLoadingServices: false,
  // services public
  publicServicesList: [],
  publicpaginatedServicesList: {},
  isLoadingSpublicervices: false,

  //  fetchAsynProducts

  productsList: [],
  paginatedProductsList: {},
  isLoadingproducts: false,

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
    // fetchAsynGroups
    [fetchAsynGroups.pending]: (state) => {
      state.isLoadingGroups = true;
    },
    [fetchAsynGroups.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoadingGroups: false,
        groupsList: payload.groups,
        paginatedGroupsList: payload,
      };
    },

    //  fetchAsynServices
    [fetchAsynServices.pending]: (state) => {
      state.isLoadingServices = true;
    },
    [fetchAsynServices.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoadingServices: false,
        servicesList: payload.services,
        paginatedServicesList: payload,
      };
    },

    [fetchAsynServices.rejected]: (state) => {
      state.isLoadingServices = false;
    },

    //  fetchAsynServices public
    [fetchAsynServicesPublic.pending]: (state) => {
      state.isLoadingSpublicervices = true;
    },
    [fetchAsynServicesPublic.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoadingServices: false,
        publicServicesList: payload.services,
        publicpaginatedServicesList: payload,
      };
    },

    [fetchAsynServicesPublic.rejected]: (state) => {
      state.isLoadingSpublicervices = false;
    },

    //  fetchAsynProducts
    [fetchAsynProducts.pending]: (state) => {
      state.isLoadingproducts = true;
    },
    [fetchAsynProducts.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoadingproducts: false,
        productsList: payload.data,
        paginatedProductsList: payload,
      };
    },
    [fetchAsynProducts.rejected]: (state) => {
      state.isLoadingproducts = false;
    },

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

// fetchAsynProducts
export const getAllProducts = (state) => state.transactions.productsList;
export const getAllPaginatedProducts = (state) =>
  state.transactions.paginatedProductsList;
export const getIsLoadingProducts = (state) =>
  state.transactions.isLoadingproducts;
// fetchAsynServices
export const getAllServices = (state) => state.transactions.servicesList;
export const getAllPaginatedServices = (state) =>
  state.transactions.paginatedServicesList;
export const getIsLoadingServices = (state) =>
  state.transactions.isLoadingServices;

// public
export const getAllpublicServices = (state) =>
  state.transactions.publicServicesList;
export const getAllpublicPaginatedServices = (state) =>
  state.transactions.publicpaginatedServicesList;
export const getpublicIsLoadingServices = (state) =>
  state.transactions.isLoadingSpublicervices;
// fetchAsynGroups
export const getAllGroups = (state) => state.transactions.groupsList;
export const getAllPaginatedGroups = (state) =>
  state.transactions.paginatedGroupsList;
export const getIsLoadingGroups = (state) => state.transactions.isLoadingGroups;

export default transactionsSlice.reducer;
