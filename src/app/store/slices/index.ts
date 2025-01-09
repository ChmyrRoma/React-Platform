import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/app/store/rest/api";
import { usersSliceActions } from "@/app/store/reducers/users";
import {filtersSliceActions} from "@/app/store/reducers/filters";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
    thunkAPI.dispatch(usersSliceActions.setLoading(true));
    const response = await api.getUsers();

    if (response) {
        thunkAPI.dispatch(usersSliceActions.getUsers(response));
        thunkAPI.dispatch(usersSliceActions.setLoading(false));
    }
    thunkAPI.dispatch(usersSliceActions.setLoading(false));
    return response;
});

export const fetchFilters = createAsyncThunk('filters/fetchFilters', async (_, thunkAPI) => {
    thunkAPI.dispatch(filtersSliceActions.setLoading(true));
    const response = await api.getFilters();

    if (response) {
        thunkAPI.dispatch(filtersSliceActions.getFilters(response));
        thunkAPI.dispatch(filtersSliceActions.setLoading(false));
    }
    thunkAPI.dispatch(filtersSliceActions.setLoading(false));
    return response;
});
