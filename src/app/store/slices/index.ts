import { createAsyncThunk } from "@reduxjs/toolkit";

import { usersApi } from "@/app/store/rest/api";
import { usersSliceActions } from "@/app/store/reducers/users";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
    thunkAPI.dispatch(usersSliceActions.setLoading(true));
    const response = await usersApi.getUsers();

    if (response) {
        thunkAPI.dispatch(usersSliceActions.getUsers(response));
        thunkAPI.dispatch(usersSliceActions.setLoading(false));
    }
    thunkAPI.dispatch(usersSliceActions.setLoading(false));
    return response;
});
