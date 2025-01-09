import { createSlice } from '@reduxjs/toolkit';

export interface IFiltersReducer {
    users: object[];
    isLoading: boolean;
}

const initialState = {
    filtersSlice: [],
    isLoading: true,
} as unknown as IFiltersReducer;

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        getFilters: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const filtersSliceActions = filtersSlice.actions;
