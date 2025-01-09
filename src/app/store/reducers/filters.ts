import { createSlice } from "@reduxjs/toolkit";

import { ICountry, IDepartment, IStatus } from "@/app/types";

export interface IFiltersReducer {
    countries: ICountry[];
    departments: IDepartment[];
    statuses: IStatus[];
    isLoading: boolean;
}

const initialState = {
    countries: [],
    departments: [],
    statuses: [],
    isLoading: true,
} as IFiltersReducer;

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        getFilters: (state, action) => {
            state.countries = action.payload.countries;
            state.departments = action.payload.departments;
            state.statuses = action.payload.statuses;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const filtersSliceActions = filtersSlice.actions;
